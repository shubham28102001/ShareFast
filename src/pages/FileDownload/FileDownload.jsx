import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';

const FileDownload = () => {
    const [searchParams] = useSearchParams();
    const fileKey = searchParams?.get('key');
    const fileName = fileKey?.substring(12);
    const [fileDownloadError, setFileDownloadError] = useState(false);
    const [fileNotFoundError, setFileNotFoundError] = useState(false);
    const [fileDeletedError, setFileDeletedError] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}download-file?key=${fileKey}`, {
            headers: {
                "Authorization": localStorage.getItem("id_jwtToken")
            }
        }).then(function (res) {
            console.log(res);
            if(res.data.success === "true") {
                if (res.data.record_exists === "true") {
                    if (res.data.is_deleted === "true") {
                        setFileDeletedError(true);
                        setFileDownloadError(false);
                        setFileNotFoundError(false);
                    } else {
                        setFileDeletedError(false);
                        setFileDownloadError(false);
                        setFileNotFoundError(false);
                        document.getElementById('download_link').href = res.data.url;
                    }
                } else {
                    setFileNotFoundError(true);
                    setFileDeletedError(false);
                    setFileDownloadError(false);
                }
            } else {
                setFileDownloadError(true);
                setFileDeletedError(false);
                setFileNotFoundError(false);
            }
        }).catch(function (err) {
            console.log(err);
        })
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Download File
                </h2>

                <div className="mb-8 mt-10">
                    <div className="text-center">
                        <div className="rounded-md bg-[#F5F7FB] py-4 px-8 mt-3">
                            <div className="flex items-center justify-center">
                                <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                                    {fileName ? fileName : 'No File Found'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <a id="download_link" href="#" target='_blank'>
                    <button
                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 mt-10 text-center text-base font-semibold text-white outline-none">
                        Download
                    </button>
                    </a>
                </div>
                {fileDownloadError === true ?
                    <div className="text-sm text-center">
                        <p className="font-semibold text-red-600">Error while downloading the file. Please try again.</p>
                    </div> : <></>
                }
                {fileNotFoundError === true ?
                    <div className="text-sm text-center mt-5">
                        <p className="font-semibold text-red-600">The file is not present on our servers.</p>
                    </div> : <></>
                }
                {fileDeletedError === true ?
                    <div className="text-sm text-center mt-5">
                        <p className="font-semibold text-red-600">The file has been deleted from our server.</p>
                    </div> : <></>
                }
            </div>
        </div>
    );
}

export default FileDownload;