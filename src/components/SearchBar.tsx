import React from 'react'
import { useState } from 'react';

interface SearchBarProps {
    getInput: (input: string) => void,
    isLoading: boolean,
    setPage: (input: number) => void,
}

const SearchBar: React.FC<SearchBarProps> = ({ getInput, isLoading, setPage }) => {
    const [searchInput, setSearchInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    return (
    <nav className="flex bg-slate-200 p-5 justify-center items-center">
        <h1 className="font-bold text-2xl pr-10">Censys Search</h1>
        <input className="mr-5 w-1/3 placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-4 shadow-sm sm:text-sm focus:outline-none" placeholder="Search for anything..." type="text" name="search"
            onChange={(e) => setSearchInput(e.target.value)}></input>
        {!isLoading ?
            <div className="bg-censysMain p-1.5 px-5 rounded-md hover:opacity-75">
                <button className="text-slate-100 font-bold" onClick={ () => getInput(searchInput) }>
                    Search
                </button>
            </div> :
            <div className="bg-censysMain p-1.5 px-5 rounded-md opacity-75 hover:cursor-wait">
                <button disabled className="text-slate-100 font-bold" onClick={ () => getInput(searchInput) }>
                    Search
                </button>
            </div>
        }
        <div className="flex gap-2 mx-3 bg-white p-1.5 px-5 rounded-md">
            <p className="text-slate-500 font-bold">Page #:</p>
            <input className="text-slate-500 font-bold" type="number" min="1" max="5" defaultValue={1} onChange={(e) => setPage(parseInt(e.target.value))} />
        </div>
    </nav>
    )
}

export default SearchBar
