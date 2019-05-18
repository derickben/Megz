import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white mt-5 p-4 text-center" style={footerStyle}>
        Copyright &copy; {new Date().toISOString().slice(0,10)} Megz
      </footer>
    </div>
  )
}

const footerStyle = {
  
};
 