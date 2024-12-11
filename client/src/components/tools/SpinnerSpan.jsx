import React from 'react'

function SpinnerSpan() {
    return (
        <span className="d-flex justify-content-center align-items-center opacity-100">
            <span className="spinner-border text-success small" role="status">
                <span className="visually-hidden">Loading...</span>
            </span>
        </span>
      )
    }

export default SpinnerSpan