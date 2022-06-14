import styles from "../style/SearchBar.module.css"

const SearchBar= () =>{
    return(
         <div className={styles.container}>
            <h2>Cerca un libro</h2>
            <div className={styles.bar}>
                <input type="text" placeholder="Cerca..." />
                <button>Cerca</button>
            </div>
        </div>
        
    )
}

export default SearchBar