import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import CheckMarkImg from '../../assets/checkmark.webp';
// import QrCode from '../../assets/qrcode.png';
// import axios from "axios";
import { QRCodeSVG } from 'qrcode.react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const SuccessMessage = () => {
    const location = useLocation();
    // const [emailLink, setEmailLink] = useState(false);
    // const [email, setEmail] = useState("");
    
    const [fileLink, setFileLink] = useState(`${window.location.host}/download?key=${location.state.key}`);

    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-center">
            <div className="m-auto w-1/6 lg:w-1/9 xl:w-1/10 2xl:w-1/12 flex items-center justify-center">
                <img src={CheckMarkImg} alt="checkmark img"></img>
            </div>
            <p className="text-center text-sm">File uploaded successfully</p>
            <div className="mt-5 border-2 h-1/2 w-1/6 lg:w-1/9 xl:w-1/9 2xl:w-1/9 rounded-md flex m-auto items-center justify-center">
                <div className="p-8"><QRCodeSVG value={fileLink} /></div>
            </div>
            <p className="mt-2 text-center text-sm">Scan QR code to download file</p>
            <p className="mt-2 text-center text-sm font-bold">OR</p>
            <div className="mt-2">
            <CopyToClipboard text={fileLink}>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" /></svg>
                    <span className="ml-2">Copy Link</span>
                </button>
            </CopyToClipboard>
                {/* <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={download}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z" /></svg>
                    <span className="ml-2">Download</span>
                </button> */}
                {/* <button className="mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => {setEmailLink(true)}}>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" clipRule="evenodd"><path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z" /></svg>
                    <span className="ml-2">Email Link</span>
                </button> */}
            </div>
                {/* <div className="mt-5 flex text-center items-center justify-center">
                    <form className="space-y-6 w-full" autoComplete="off">
                        <div>
                            <div className="mt-5 flex justify-center items-center">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-5/12 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
                                    placeholder="Recipient's Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="flex w-1/6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send
                            </button>
                            <button
                                type="button"
                                className="ml-5 flex w-1/6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div> */}
        </div>
        // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
        //     {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //         <img src={CheckMarkImg} alt="checkmark img" className="w-30"></img>
        //     </div> */}

        //     {/* <img src={CheckMarkImg} alt="checkmark img"></img>
        //     <div className="sm:mx-auto sm:w-full sm:max-w-sm w-1/2 h-20">
        //         <img src={CheckMarkImg} alt="checkmark img"></img>
        //     </div>
        //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //         <img src={QrCode} alt="qr code"></img>
        //     </div> */}
        // </div>
    );
}

export default SuccessMessage;