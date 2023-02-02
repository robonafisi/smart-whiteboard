import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useDraw } from '../../hooks/useDraw'
import { ChromePicker } from 'react-color'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  
  const[color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [drawmode, setDrawmode] = useState("text")

const callGenerateEndpoint = async () => {
  
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;

  setApiOutput(`${output.text}`);
}

  const onUserChangedText = (e) => {
    setUserInput(e.target?.value);
  };

  function drawLine  ({prevPoint, currentPoint, ctx}: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5    
    let startPoint = prevPoint ?? currentPoint

    if ( drawmode == "text" ){

      ctx.font = "60px serif";
      ctx.fillText("Hello World", 10, 50);

    } else if ( drawmode == "drawing" ) {

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()}

  };


  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      
      <Head>
        <title>AlgoLego MVP</title>
      </Head>
      <div className='m-6'>
        <div className='border-solid border-2 border-black'>
        <textarea
          placeholder="start typing here"
          className="prompt-box w-full"
          value={userInput}
          onChange={onUserChangedText}
        />
        </div>

        <div>
        <button 
        className='p-2 rounded-md border border-black w-full'
        onClick={callGenerateEndpoint}>
          Make API Call
        </button>
        </div>

        <div>
        <div>
        <input
          name='drawmode'
          type="radio"
          id="selection1"
          value="drawing"
          onChange={() => setDrawmode("drawing")}
        />
        <label>Drawing</label>
        </div>
        <div>
        <input
          name='drawmode'
          type="radio"
          id="selection2"
          value="value"
          onChange={() => setDrawmode("text")}
        />
        <label>Text</label>
        </div>
        </div>

      <div >
        {apiOutput && (
      <div className="flex-wrap border-solid border-2 border-black">
        <div className="output-header-container">
        </div>
        <div>
        <h3 contentEditable="true">
          {apiOutput}
        </h3>
        </div>
      </div>
      )}    </div>

      </div>

      <div className='flex flex-col gap-10 pr-10'>
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)}/>
      <button type='button' onClick={clear} className='p-2 rounded-md border border-black'>Clear Canvas</button>
      </div>

      <div className='w-screen h-screen'>
      <canvas
      onMouseDown={onMouseDown} 
      ref={canvasRef}
      width={750}
      height={750}
      className="border border-black rounded-md" />
      </div>

    </div>
  )
}
