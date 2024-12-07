import { useEffect, useState } from 'react'
import './styles.css'

function ShortenedUrl({ userLink, generatedLink }) {
  const [copy, setCopy] = useState('Copy')

  const handleCopy = () => {
    setCopy('Copied!')
    navigator.clipboard.writeText(generatedLink)
  }

  return (
    <div className="shortened-url-wrapper">
      <span className="user-url">
        {userLink}
      </span>
      <div className="generated-url-wrapper">
        <a href={generatedLink} target="_blank" className="generated-url">{generatedLink}</a>
        <button
          onClick={handleCopy}
          className={`copy-generated-button ${copy === 'Copied!' ? 'copied' : ''}`}
        >
          {copy}
        </button>
      </div>
    </div>
  )
}

export default function LinkShorten() {
  const [inputURL, setInputURL] = useState('')
  const [generatedURLs, setGeneratedURLs] = useState()

  useEffect(() => {
    setGeneratedURLs(JSON.parse(localStorage.getItem('storagedURLs')) || [])
  }, [])

  const API_URL = 'https://url-short-api-seven.vercel.app/shorten'

  const linkShorten = async () => {
    const fixedURL = inputURL.trim();
  
    if (!fixedURL) return;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fixedURL }),
      });
  
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
  
      const newGeneratedURL = {
        userInput: fixedURL,
        shortenURL: data.result_url,
      };
  
      setGeneratedURLs((prevURLs) => [...prevURLs, newGeneratedURL]);
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('storagedURLs', JSON.stringify(generatedURLs))
    }, 500)
  
    return () => clearTimeout(timeout)
  }, [generatedURLs])

  return (
      <section className="link-shorten">

        <div className="link-shorten-form-wrapper wrapper">
          <form action="shorten-link" className="shorten-link-form">
            <div className="url-input">
              <input
                name="shorten-link-input"
                id="shorten-link-input"
                type="text"
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
                placeholder="Shorten a link here..."
                required
              />
              <span className="url-error-message">Please add a link</span>
            </div>
            <button onClick={linkShorten} type="button" className="shorten-button button">
              Shorten It!
            </button>
          </form>
        </div>

        <article className="shortened-urls-wrapper wrapper">
          <ul>
          {}
          {generatedURLs && generatedURLs.map((generatedURL, index) => (
            <li key={index}>
              <ShortenedUrl
                userLink={generatedURL.userInput}
                generatedLink={generatedURL.shortenURL}
              />
            </li>
          ))}
          </ul>
        </article>

      </section>
  )
}