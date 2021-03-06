import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';

export default function Main({ match }) {

    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id
                }
            });

            setDevs(response.data);
        }

        loadDevs();
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: match.params.id
            }
        });

        setDevs(devs.filter(dev => dev._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: {
                user: match.params.id
            }
        });

        setDevs(devs.filter(dev => dev._id !== id));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Tindev" />
            </Link>
            {devs.length > 0 ? (
                <ul>
                    {devs.map(dev => (
                        <li key={dev._id}>
                            <img src={dev.avatar} alt={dev.name} />
                            <footer>
                                <strong>{dev.name}</strong>
                                <p>{dev.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(dev._id)}>
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button type="button" onClick={() => handleLike(dev._id)}>
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                    <div className="empty">Acabou :(</div>
                )}
        </div>
    );
}