export default function Modal() {
    return (
        <div>
            <button className="btn" onClick={()=>document.getElementById('create_modal').showModal()}>open modal</button>
            <dialog id="create_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form action="">
                        <input type="text" name="first_name" onChange={handleChange} placeholder="First Name" className="input input-bordered input-white "/>
                        <input type="text" name="last_name" onChange={handleChange} placeholder="Last Name" className="input input-bordered input-white "/>
                        <ColorPicker value={color} onChange={setColor} hidePresets={true} hideControls={true} hideOpacity={true} hideInputs={true} />
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="btn btn-accents">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}