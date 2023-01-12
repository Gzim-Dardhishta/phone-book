import React, { useState, useEffect } from 'react';
import useFetch from './hooks/useFetch';

const PhoneBook = () => {

    const { data: contacts, isLoading, error } = useFetch('http://localhost:8000/contacts');


    const [modalTitle, setModalTitle] = useState('');

    const [id, setId] = useState('');
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
        setNumberInput(list);
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


    const handleSubmit = (e) => {
        e.preventDefault();

        const infos = { name, lastname, address, city, country, emailInput, numberInput };

        fetch('http://localhost:8000/contacts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("added")
        })
    }

    const editClick = (con) => {
        setModalTitle('Update contact');

        setId(con.id);
    }

    const handleEdit = (e) => {
        e.preventDefault();

        const infos = { name: name, lastname: lastname, address: address, city: city, country: country, emailInput: emailInput, numberInput: numberInput };

        fetch('http://localhost:8000/contacts/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(infos)
        }).then(() => {
            console.log("updated")
        })
    }

    const addClick = () => {
        setModalTitle('Register new contact')
    }

    return (
        <>
            <nav className='p-3 bg-dark text-white'>
                <h1 className='display-6'>PhoneBook</h1>
            </nav>

            <main className='mx-auto mt-5' style={{ width: "80%" }}>
                <div className='d-flex justify-content-between'>
                    <h3>Contacts</h3>
                    <button className='bg-primary border-0 rounded p-2 text-white' data-bs-toggle="modal"
                        data-bs-target="#exampleModal" onClick={addClick}>Add Contact</button>
                </div>

                <div className="contact-list">
                    <table></table>
                </div>


                {/* Modal for Create and Update */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className='modal-dialog modal-lg modaldialog-centered'>
                        <div className='modal-content'>
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <form >
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
                                                <input type="button" className="btn btn-outline-primary " onClick={addEmailInput} value="Add" />
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
                                                <input type="button" className="btn btn-outline-primary " onClick={addNumberInput} value="Add" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="w-100">
                                            {modalTitle == "Register new contact" ? <input type="button" onClick={handleSubmit} className="btn btn-outline-success w-100 mt-4" value="Save" />
                                                : <input type="button" onClick={handleEdit} className="btn btn-outline-success w-100 mt-4" value="Update" />}

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>


                {/* Contact Table */}
                <div>
                    {error && <div>{error}</div>}
                    {isLoading && <div>Loading...</div>}

                    {contacts &&

                        <section className='mt-5'>
                            <table className='table table-bordered text-center'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Address</th>
                                        <th>City</th>
                                        <th>Country</th>
                                        <th>Email</th>
                                        <th>Number</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {contacts.map(con => (
                                        <tr key={con.id}>
                                            <td>{con.name}</td>
                                            <td>{con.lastname}</td>
                                            <td>{con.address}</td>
                                            <td>{con.city}</td>
                                            <td>{con.country}</td>
                                            <td>{con.emailInput.map(m => (
                                                <>
                                                    {m.email}<br />
                                                </>
                                            ))}</td>
                                            <td>{con.numberInput.map(n => (
                                                <>{n.number}</>
                                            ))}</td>

                                            <td><button className='btn btn-success' data-bs-toggle="modal"
                                                data-bs-target="#exampleModal" onClick={(e) => editClick(con)}>Edit</button></td>
                                            <td><button
                                                className='btn btn-danger'
                                                onClick={(e) => {
                                                    fetch('http://localhost:8000/contacts/' + con.id, {
                                                        method: 'DELETE'
                                                    })
                                                        .then((response) => {
                                                            if (!response.ok) {
                                                                throw new Error('Something went wrong')
                                                            }
                                                        })
                                                        .catch((e) => {
                                                            console.log(e)
                                                        });
                                                }}
                                            >Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    }
                </div>
            </main>
        </>
    )
}

export default PhoneBook