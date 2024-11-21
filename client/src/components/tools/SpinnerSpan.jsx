import React from 'react'

function SpinnerSpan() {
    return (
        <span className="d-flex justify-content-center align-items-center">
            <span className="spinner-border text-primary small" role="status">
                <span className="visually-hidden">Loading...</span>
            </span>
        </span>
      )
    }

export default SpinnerSpan