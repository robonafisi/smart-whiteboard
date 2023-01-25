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

  function drawLine  ({prevPoint, currentPoint, ctx}: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  };

  // const basePromptPrefix = "";
  // const fromfront = "What is happening?"
  // //req.body.userInput

  // const callAPI = async (req, res) => {
  //   // Run first prompt
  //   console.log(`API: ${basePromptPrefix}${fromfront}`)
  
  //   const baseCompletion = await openai.createCompletion({
  //     model: 'text-davinci-003',
  //     prompt: `${basePromptPrefix}${fromfront}`,
  //     temperature: 0.7,
  //     max_tokens: 250,
  //   });
    
  //   const basePromptOutput = baseCompletion.data.choices.pop();
  
  //   res.status(200).json({ output: basePromptOutput });
  // };

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>

      <div>
        <button className='p-2 rounded-md border border-black'>Make API call</button>
      </div>

      <div className='flex flex-col gap-10 pr-10'>
      <ChromePicker color={color} onChange={(e) => setColor(e.hex)}/>
      <button type='button' onClick={clear} className='p-2 rounded-md border border-black'>Clear Canvas</button>
      </div>

      <canvas
      onMouseDown={onMouseDown} 
      ref={canvasRef}
      width={750}
      height={750}
      className="border border-black rounded-md" />

    </div>
  )
}
