import { createContext, useContext, useState, useEffect } from "react";


const GlobalContext = createContext();



export const GlobalContextProvider = ({ children }) => {

    let URL = process.env.REACT_APP_BACKEND_URL;

    const [memories, setMemories] = useState([]);
    const [mood, setMood] = useState();

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [progress, setProgress] = useState(0)
    const getMemories = async () => {
        setProgress(0);
        const requestOptions = {
            method: "GET",
        };

        // await new Promise((resolve)=>setTimeout(resolve,1000));

        await fetch(`${URL}/getmemories?page=${page}`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                const newMemories = data.memories;
                const updatedMemories = [...memories, ...newMemories];

                setMemories(updatedMemories)
                setPageCount(data.pagination.pageCount);
                setProgress(100);
            })
    }


    const [alert, setAlert] = useState(null)

    const setShowAlert = (mes, stat) => {
        setAlert({
            message: mes,
            status: stat
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000)
    }


    useEffect(() => {
        getMemories()
    }, [page])


    return (
        <GlobalContext.Provider value={{ memories, alert, setShowAlert, setMood, mood, page, setPage, pageCount, setPageCount,progress, setProgress }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)