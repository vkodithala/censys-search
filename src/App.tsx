import React from 'react';
import { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';
import Host from './components/Host'

interface HostData {
  address: string,
  num_protocols: number,
}

export default function App() {
  const apiUrl: string = "https://search.censys.io/api/v2/hosts/search";
  const apiKey: string = process.env.REACT_APP_API_KEY || "";
  const apiSecret: string = process.env.REACT_APP_API_SECRET || "";
  const credentials: string = `${apiKey}:${apiSecret}`;
  const base64encodedcredentials: string = btoa(credentials);

  const [searchInput, setSearchInput] = useState("");
  const [hostResults, setHostResults] = useState<HostData[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getInput = (input: string) => {
    setSearchInput(input);
  }

  useEffect(() => {
    console.log(searchInput);
    console.log(page);
    if (searchInput != "") {
      setLoading(true);
      fetchResult(searchInput);
    }
  }, [searchInput, page])

  const queryParams: Record<string, string | number> = {
    q: searchInput,
    per_page: 50,
    virtual_hosts: "EXCLUDE",
    sort: "RELEVANCE"
  }
  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  const fetchResult = async (query: string) => {
    await fetch(`${apiUrl}?${searchParams.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${base64encodedcredentials}`,
      }
    }).then(async (response: Response) => {
      if (!response.ok) {
        if (response.status == 422) {
          setToastMessage("Please enter a valid query.");
          setLoading(false);
        } else {
          throw new Error("Failed to fetch data.")
        }
      }
      const result = await response.json();
      console.log(result);
      if (result?.result?.hits) {
        const newData: HostData[] = result.result.hits.map((element: any) => ({
          address: element.ip,
          num_protocols: element.services.length
        }));
        console.log(newData);
        showResults(newData);
      } else {
        setHostResults([]);
      }
    })
  }

  const showResults = async (result: HostData[]) => {
    const startIdx: number = (page - 1) * 10;
    const endIdx: number = page * 10
    setHostResults(result.slice(startIdx, endIdx));
    setLoading(false);
  }

  return (
    <div>
      <SearchBar getInput={getInput} isLoading={isLoading} setPage={setPage} />
      <div className="flex flex-col justify-center items-center my-5">
        {hostResults.length > 0 ? (
          hostResults.map((item, index) => (
            <Host key={index} address={item.address} num_protocols={item.num_protocols} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}