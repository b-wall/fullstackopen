import React from 'react'

const Course = ({ course }) => {
    console.log(course)
    const total = course.parts.reduce((prevVal, currVal) => (prevVal + currVal.exercises), 0)
    return (
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(c => 
                    <li key={c.id}>
                        {c.name} {c.exercises}
                    </li>
                    )}
            </ul>
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}

export default Course