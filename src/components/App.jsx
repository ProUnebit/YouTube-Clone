import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Header from './Header'
import Feed from './Feed'
// import SearchResult from './SearchResult'
// import VideoDetails from './VideoDetails'

import { AppContext } from '../context/contextApi'

const App = () => {

    return (
        <AppContext>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        {/* <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
                        <Route path="/video/:id" element={<VideoDetails />} /> */}
                    </Routes>
                </div>
            </BrowserRouter>
        </AppContext>
    )
}

export default App