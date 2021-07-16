import React from 'react'

function Spinner() {
    return (
        // <div style={{height: "100%"}}>
        //     <img src="https://media.giphy.com/media/3AMRa6DRUhMli/giphy.gif" alt="" style={{width: '100%'}} />
        // </div>
        <div class="spinner-border text-primary flex justify-content-center align-item-center" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    )
}

export default Spinner
