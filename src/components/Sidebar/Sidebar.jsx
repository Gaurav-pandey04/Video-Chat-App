import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './sidebar.css'

const Sidebar = () => {

    const [isClick, setIsclick] = useState(false);
    const [isContact, setIsContact] = useState(false);

    return (
        <div className='sidebar'>
            <div>
                <div className="heading">
                    <img src={assets.contact} alt="" />
                    <p>Saved Contacts</p>
                </div>
                <div className="contacts">
                    <div className="contact" onClick={()=>setIsContact(true)}>
                        <img src={assets.user} alt="" />
                        <p>Contact 1</p>
                    </div>
                    <div className="contact" onClick={()=>setIsContact(true)}>
                        <img src={assets.user} alt="" />
                        <p>Contact 2</p>
                    </div>
                </div>
            </div>

            {
                isContact ?
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsContact(false)}>&times;</span>
                        <p>Details of contact!</p>
                        <hr className='hr'/>
                            <p className='user-name'>Name: <span>ABC DEF</span></p>
                            <br />
                            <p className='user-id'>Id: <span>A!@4bjjwhjhjjaBHUuuj</span></p>
                            <br />
                            <button type='submit' className='btn' onClick={() => setIsContact(false)}>Delete Contact</button>
                            <button type='submit' className='btn' onClick={() => setIsContact(false)}>Call Contact</button>
                    </div>
                </div>
                : null
            }

            <div className='footer'>
                <div className='copyId'
                    onClick={() => {
                        navigator.clipboard.writeText("User Id");
                    }}>
                    <img src={assets.copy} alt="" />
                    <p>Copy your Id</p>
                </div>
                <div className="add-user">

                    <img src={assets.add} alt="" onClick={() => setIsclick(true)} />
                    <p onClick={() => setIsclick(true)}>Add User</p>

                    {isClick ?
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setIsclick(false)}>&times;</span>
                                <p>Please Enter details of contact!</p>
                                <hr />
                                <form action="#">
                                    <label htmlFor="name">Name: </label>
                                    <input type="text" placeholder='Enter the name' id='name' />
                                    <br />
                                    <label htmlFor="id">Id: </label>
                                    <input type="text" placeholder='Enter the id of user' id='user-id' />
                                    <br />
                                    <button type='submit' onClick={() => setIsclick(false)}>Create a contact</button>
                                </form>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
