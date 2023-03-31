import { CSSProperties } from "react";

export const navBar: CSSProperties = {
    backgroundColor: '#0078ff',
    height: '20px',
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: '100vw',
    padding: '10px',
    color: 'white',
    zIndex: 2
}

export const navBarElement: CSSProperties = {
    // horizontal padding 10px
    padding: '0 10px',
}

// selected navbar element
export const navBarElementSelected: CSSProperties = {
    // horizontal padding 10px
    padding: '0 10px',
    backgroundColor: '#0EC3F1',
    height: '20px',
    width: '40px',
    border: '1px #d8272a',
    color: 'white',
    //round corners
    borderRadius: '5px',
}

export const navBarButton: CSSProperties = {
    // horizontal padding 10px
    padding: '0 20px',
    backgroundColor: '#0EC3F1',
    height: '20px',
    width: '40px',
    border: '1px #d8272a',
    color: 'white',
    //round corners
    borderRadius: '5px',
}

export const navBarNewButton: CSSProperties = {
    // on the right, plus sign
    position: 'absolute',
    right: '30px',
    top: '10px',
    border: '1px #d8272a',
    color: 'white',
    padding: '0 10px',
    //round corners
    borderRadius: '5px',
    cursor: 'pointer',
}