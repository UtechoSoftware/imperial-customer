/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Language = () => {
    const { i18n } = useTranslation();
    const userLangauge = JSON.parse(window.localStorage.getItem('imperial_language')) || "pt"

    const handleChangeLanguage = (lan) => {
        i18n.changeLanguage(lan)
        window.localStorage.setItem('imperial_language', JSON.stringify(lan))
        // console.clear()
    }
    useEffect(() => {
        handleChangeLanguage(userLangauge)
    }, [userLangauge])

    console.log(userLangauge, 'userLangauge');

    return (
        <div className='d-flex gap-1 align-items-center w-100'>
            {/* Language Select Dropdown */}
            <select
                className='px-3 py-2  text-white'
                style={{ minWidth: '5.5rem', cursor: 'pointer', border: "1px solid black", borderRadius: "50px ", backgroundColor: "#b39d70" }}
                value={userLangauge}
                onChange={(e) => handleChangeLanguage(e.target.value)}
            >
                <option value="en" className="p-1 text-white">English</option>
                <option value="pt" className="p-1 text-white">Português</option>
            </select>
        </div>
    )
}

export default Language