import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg'

const PhoneBook = () => {

    const [popup, setPopup] = useState(false);
    const showPopup = () => {
        setPopup(!popup);
    }

    const closePopup = () => {
        setPopup(false)
    }

    // form inputs

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleNameChange = (value) => {
        setName(value);
    }

    const handleLastNameChange = (value) => {
        setLastName(value);
    }

    const handleAddressChange = (value) => {
        setAddress(value);
    }

    const handleCityChange = (value) => {
        setCity(value);
    }

    const handleCountryChange = (value) => {
        setCountry(value);
    }

    const [numberInput, setNumberInput] = useState([{
        number: '',
    }]);

    const addNumberInput = () => {
        setNumberInput([...numberInput, {
            number: '',
        }])
    }

    const handleNumberChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...numberInput];
        list[index][name] = value;
        setEmailInput(list);
    }

    const [emailInput, setEmailInput] = useState([{
        email: '',
    }]);

    const addEmailInput = () => {
        setEmailInput([...emailInput, {
            email: '',
        }])
    }

    const handleEmailChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...emailInput];
        list[index][name] = value;
        setEmailInput(list);
    }
    return (
        <>
            <nav className='p-3 bg-dark text-white'>
                <h1 className='display-6'>PhoneBook</h1>
            </nav>

            <main className='mx-auto mt-5' style={{ width: "80%" }}>
                <div className='d-flex justify-content-between'>
                    <h3>Contacts</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' onClick={showPopup}>Add Contact</button>

                    {popup ? <div className="backdrop" onClick={closePopup}></div> : null}
                </div>

                <div className="contact-list">
                    <table></table>
                </div>
            </main>

            {popup ?
                <div className='form-inputs'>
                    <div className="close-button" onClick={closePopup}><CgClose /></div>
                    <p>Register new contact</p>

                    <div className="name">
                        <small>Name: </small>
                        <input type="text" onChange={(e) => handleNameChange(e.target.value)} value={name} name="name" className="form-control" placeholder="Enter your name" />
                    </div>

                    <div className="lastname">
                        <small>LastName: </small>
                        <input type="text" onChange={(e) => handleLastNameChange(e.target.value)} value={lastname} name="lastname" className="form-control" placeholder="Enter your lastname" />
                    </div>

                    <div className="address">
                        <small>Address: </small>
                        <input type="text" onChange={(e) => handleAddressChange(e.target.value)} value={address} name="address" className="form-control" placeholder="Enter your address" />
                    </div>

                    <div className="city">
                        <small>City: </small>
                        <input type="text" onChange={(e) => handleCityChange(e.target.value)} value={city} name="city" className="form-control" placeholder="Enter your city" />
                    </div>

                    <div className="country">
                        <small>Contry: </small>
                        <input type="text" onChange={(e) => handleCountryChange(e.target.value)} value={country} name="lastname" className="form-control" placeholder="Enter your country" />
                    </div>

                    <div className="email">
                        <small>Email: </small>
                        {emailInput.map((data, index) => {
                            const { email } = data;
                            return (
                                <div className="row " key={index}>
                                    <div className="col">
                                        <div className="form-group">
                                            <input type="email" onChange={(evnt) => handleEmailChange(index, evnt)} value={email} name="email" className="form-control" placeholder="Enter your email" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-outline-primary " onClick={addEmailInput}>Add</button>
                            </div>
                        </div>
                    </div>

                    <div className="number">
                        <small>Number: </small>
                        {numberInput.map((data, index) => {
                            const { number } = data;
                            return (
                                <div className="row " key={index}>
                                    <div className="col">
                                        <div className="form-group">
                                            <input type="tel" onChange={(evnt) => handleNumberChange(index, evnt)} value={number} name="number" className="form-control" placeholder="Enter your number 04* *** ***" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-outline-primary " onClick={addNumberInput}>Add</button>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className="w-100">
                            <button className="btn btn-outline-success w-100 mt-4">Add</button>
                        </div>
                    </div>

                </div> : null
            }
        </>
    )
}

export default PhoneBook