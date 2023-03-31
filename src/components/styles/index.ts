import { CSSProperties } from "react";

export const note: CSSProperties = {
    position: 'absolute',
    width: '100px',
    height: '100px',
    backgroundColor: '#e6ac00',
    border: '1px solid black',
    borderRadius: '5px',
    
}

export const authorText: CSSProperties = {
    position: 'absolute',
    right: '4px',
    bottom: '4px'
}

export const dateText : CSSProperties = {
    position: 'absolute',
    left: '4px',
    bottom: '4px'
}

export const mainText: CSSProperties = {
    position: 'absolute',
    left: '4px',
    top: '4px'
}

export const dragOverlay: CSSProperties = {
    position: 'absolute',
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '5px',
    zIndex: 1
}

export const dragOverlayText: CSSProperties = {
    position: 'relative',
}

export const newWindow: CSSProperties = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 2,
}

export const newWindowNote: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '400px',
    backgroundColor: '#e6ac00',
    borderRadius: '5px 5px 0 0',
    zIndex: 2,
}

export const newWindowText: CSSProperties = {
    position: 'absolute',
    top: '1px',
    left: '1px',
    backgroundColor: "transparent",
    width: '388px',
    height: '364px',
    // dashed border
    border: '3px dashed black',
}

export const newWindowAuthorText: CSSProperties = {
    position: 'absolute',
    right: '1px',
    bottom: '1px',
    width: '100px',
    // align the text right
    textAlign: 'right',
    backgroundColor: "transparent",
    border: '3px dashed black',
}

export const createButton: CSSProperties = {
    position: 'absolute',
    bottom: '-41px',
    height: '40px',
    padding: '0px 5px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderColor: ' transparent',
    borderRadius: '0 0 5px 5px',
    color: 'white',
    width: '100%',
}


export const deleteButton: CSSProperties = {
    position: 'absolute',
    bottom: '-81px',
    height: '40px',
    padding: '0px 5px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderColor: ' transparent',
    borderRadius: '0 0 5px 5px',
    color: 'white',
    width: '100%',
}

export const closeButton: CSSProperties = {
    position: 'absolute',
    top: '-41px',
    right: '0',
    height: '40px',
    padding: '0px 5px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderColor: ' transparent',
    borderRadius: '0 5px 0 0',
    color: 'white',
    width: '50px',
}

export const createErrorText: CSSProperties = {
    position: 'absolute',
    bottom: '-121px',
    height: '40px',
    padding: '0px 5px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderColor: ' transparent',
    borderRadius: '0 0 5px 5px',
    width: '100%',
    color: 'red',
}