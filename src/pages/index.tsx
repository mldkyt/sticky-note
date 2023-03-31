import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react';
import { StickyNote } from '@/components/datatypes/StickyNote';
import { authorText, dragOverlay, mainText, newWindow, newWindowAuthorText, newWindowNote, newWindowText, note, deleteButton, createButton, createErrorText, dateText, closeButton } from '@/components/styles';
import Draggable, { DraggableData, DraggableEvent, DraggableEventHandler, DraggableProps } from 'react-draggable';
import NavBar from '@/components/elements/NavBar';
import { captureMessage } from '@sentry/nextjs';
import { setTextRange } from 'typescript';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [stickyNotes, setStickyNotes] = useState<Array<StickyNote>>([]);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const [newTextField, setNewTextField] = useState<string>('');
  const [newAuthorField, setNewAuthorField] = useState<string>('');
  const [newError, setNewError] = useState<string>('');

  const hasRanStart = useRef(false);

  useEffect(() => {
    if (!hasRanStart.current) {
      hasRanStart.current = true;
      const stickyNotes = localStorage.getItem('stickyNotes');
      if (stickyNotes) {
        setStickyNotes(JSON.parse(stickyNotes));
      }
    }
  })

  function createNew() {
    // verify 128 max chars, 1 min, author max 12, 1 min  
    if (newTextField.length < 1 || newTextField.length > 128) {
      setNewError('Text must be between 1 and 128 characters');
      return;
    }
    if (newAuthorField.length < 1 || newAuthorField.length > 12) {
      setNewError('Author must be between 1 and 12 characters');
      return;
    }
    setShowNew(false);
    setNewError('');
    const tempStickyNotes = stickyNotes;
    tempStickyNotes.push({
      text: newTextField,
      author: newAuthorField,
      posX: 100 + (Math.random() * 500),
      posY: 100 + (Math.random() * 500),
      startX: 0,
      startY: 0,
      date: new Date()
    });
    saveNotes();
  }

  function saveNotes() {
    localStorage.removeItem('stickyNotes');
    localStorage.setItem('stickyNotes', JSON.stringify(stickyNotes));
  }

  return (
    <>
      <Head>
        <title>Sticky notes</title>
      </Head>
      <NavBar mode='home' onNew={() => setShowNew(true)} />
      <main className={inter.className}>
        {
          showNew && (
            <div style={newWindow}>
              <div style={newWindowNote}>
                <textarea value={newTextField} onChange={(x) => setNewTextField(x.currentTarget.value)} style={newWindowText} className={inter.className} />
                <input value={newAuthorField} onChange={(x) => setNewAuthorField(x.currentTarget.value)} type='text' style={newWindowAuthorText} className={inter.className} />
                <button style={createButton} onClick={createNew}>Save</button>
                {
                  newError != '' && (
                    <span style={createErrorText}>{newError}</span>
                  )
                }
              </div>
            </div>
          )
        }
        {
          editIndex != -1 && (
            <div style={newWindow}>
              <div style={newWindowNote}>
                <button style={closeButton} onClick={() => {
                  setEditIndex(-1);
                  setNewError('');
                  setNewTextField('');
                  setNewAuthorField('');
                }}>X</button>
                <textarea placeholder='Note text goes here...' value={stickyNotes[editIndex].text} onChange={(x) => {
                  const tempStickyNotes = stickyNotes;
                  tempStickyNotes[editIndex].text = x.currentTarget.value;
                  setStickyNotes([...tempStickyNotes]);
                }} style={newWindowText} className={inter.className} />
                <input placeholder='Sign goes here...' value={stickyNotes[editIndex].author} onChange={(x) => {
                  const tempStickyNotes = stickyNotes;
                  tempStickyNotes[editIndex].author = x.currentTarget.value;
                  setStickyNotes([...tempStickyNotes]);
                }} type='text' style={newWindowAuthorText} className={inter.className} />
                <span style={dateText}>{stickyNotes[editIndex].date.toDateString()} {stickyNotes[editIndex].date.toLocaleTimeString()}</span>
                <button style={createButton} onClick={() => {
                  if (stickyNotes[editIndex].text.length < 1 || stickyNotes[editIndex].text.length > 128) {
                    setNewError('Text must be between 1 and 128 characters');
                    return;
                  }
                  if (stickyNotes[editIndex].author.length < 1 || stickyNotes[editIndex].author.length > 12) {
                    setNewError('Author must be between 1 and 12 characters');
                    return;
                  }
                  stickyNotes[editIndex].date = new Date();
                  setEditIndex(-1);
                  setNewTextField('');
                  setNewAuthorField('');
                  setNewError('');
                  saveNotes();
                }}>Save</button>
                <button style={deleteButton} onClick={() => {
                  const tempStickyNotes = stickyNotes;
                  tempStickyNotes.splice(editIndex, 1);
                  setStickyNotes([...tempStickyNotes]);
                  setEditIndex(-1);
                  setNewTextField('');
                  setNewAuthorField('');
                  saveNotes();
                }}>Delete</button>
                {
                  newError != '' && (
                    <span style={createErrorText}>{newError}</span>
                  )
                }
              </div>
            </div>
          )
        }
        <div>
          {
            stickyNotes.map((x, i) => {
              function open() {
                setEditIndex(i);
              }

              function onDragStop(e: DraggableEvent, data: DraggableData): false | void {
                // delete from list, add it back
                stickyNotes[i].posX = data.x;
                stickyNotes[i].posY = data.y;
                setStickyNotes([...stickyNotes]);
                saveNotes();
              }
              return (
                <Draggable onStop={onDragStop} position={{ x: x.posX, y: x.posY }}>
                  <div onDoubleClick={open} style={note}>
                    <span style={mainText}>{x.text}</span>
                    <br></br>
                    <span style={authorText}>{x.author}</span>
                  </div>
                </Draggable>
              )
            })
          }
        </div>
      </main>
    </>
  )
}
