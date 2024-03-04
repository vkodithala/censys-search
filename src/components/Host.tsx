import React from 'react';

export default function Host(props: any) {
    return (
        <div className="p-5 bg-slate-100 w-2/3 rounded-md shadow hover:shadow-md hover:cursor-pointer mb-3">
            <p className="text-censysMain font-extrabold pb-2 text-2xl">{props.address}</p>
            <div className="flex flex-row gap-2">
                <p className="text-slate-500 font-semibold">Number of protocols: {props.num_protocols} </p>
            </div>
        </div>
    )
}