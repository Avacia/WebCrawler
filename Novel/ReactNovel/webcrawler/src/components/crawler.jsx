import { useQuery } from 'react-query'
import { useState } from 'react'
import axios from 'axios'

import './crawler.css'

export default function webCrawler(){
    const [fontSize, setFontSize] = useState(16)
    const [count, setCount] = useState(400)
    const [url, setUrl] = useState("https://www.twbook.cc/1512441815/400.html")

    const fetchData = async (url) =>{
        try{
            const response = await axios.get(`http://127.0.0.1:5000/api/data?url=${encodeURIComponent(url)}`)
            console.log(response.data)
            return response.data
        }
        catch(error){
            throw new Error(`Error fetching data from ${error.message}`)
        }
    }

    function handleUrlChange(){
        setUrl(`https://www.twbook.cc/1512441815/${count}.html`)
    }

    function addCount(){
        setCount(count + 1)
        handleUrlChange()
    }

    function minusCount(){
        setCount(count - 1)
        handleUrlChange()
    }

    const {isLoading, error, data} = useQuery(['webData', url], () => fetchData(url))

        if(isLoading){
            return(
                <div>
                    Loading...
                </div>
            )
        }

    if(error){
        return(
            <div>
                Error
            </div>
        )
    }

    return(
        <div className="App">

            <div className='fontBtnContainer'>
                <button className='fontBtn' onClick={() => setFontSize(fontSize - 2)}><h3>-A</h3></button>
                <button className='fontBtn' onClick={() => setFontSize(fontSize + 2)}><h3>+A</h3></button>
            </div>

            <div className='paragraph' style={{fontSize: `${fontSize}px`}}>
                {data.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>))}
            </div>

            <div className="pageBtnContainer">
                <button className="pageBtn" onClick={addCount}>Next</button>
                <button className="pageBtn" onClick={minusCount}>Previous</button>
            </div>
            
        </div>
    )
}