import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axis from 'axios';
import axios from "axios";
import mime from 'mime';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUploadError, setFileUploadError] = useState(false);
    const navigate = useNavigate();

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]);
    }

    const onFileUpload = (event) => {
        event.preventDefault();
        if (!selectedFile) return;
        let selectedFileType = mime.getType(selectedFile);
        let contentType = selectedFileType ? selectedFileType : 'application/octet-stream';
        axis.post(`${process.env.REACT_APP_API_LINK}upload-file`, {"fileName": selectedFile.name}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("id_jwtToken"),
            }
        }).then(function (res) {
            console.log(res);
            const key = res.data.body.key;
            const fileUploadURL = res.data.body.file_upload_url;
            axios.put(fileUploadURL, selectedFile, {
                headers: {
                'Content-Type': contentType,
                }
            }).then(() => {
                console.log("File Uploaded Successfully");
                navigate("/success", { state: { key: key } });
            }).catch(function (err) {
                console.log(err);
            })
        }).catch(function (err) {
            console.log(err);
        })
    }

    const onFileRemove = () => {
        document.getElementById("file").value = null;
        setSelectedFile(null);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form className="py-4 px-9">
                    <div className="mb-6 pt-4">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Upload Files
                        </h2>

                        <div className="mb-8 mt-10">
                            <input type="file" name="file" id="file" className="sr-only" onChange={onFileChange} />
                            <label htmlFor="file"
                                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                                <div>
                                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                        Drop your file here
                                    </span>
                                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                        or
                                    </span>
                                    <span
                                        className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer">
                                        Browse
                                    </span>
                                </div>
                            </label>
                        </div>
                        {selectedFile ?
                            <>
                                <p className="font-semibold">File to Upload:</p>
                                <div className="rounded-md bg-[#F5F7FB] py-4 px-8 mt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                                            {selectedFile.name}
                                        </span>
                                        <span className="truncate pr-3 text-base font-medium text-[#07074D] cursor-pointer" onClick={onFileRemove}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                                <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                                            </svg>
                                        </span>

                                    </div>
                                </div>
                            </>
                            : <></>
                        }
                    </div>
                    <div className="text-center">
                        <button
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-base font-semibold text-white outline-none" onClick={onFileUpload}>
                            Upload
                        </button>
                    </div>
                </form>
                {fileUploadError === true ?
                    <div className="text-sm text-center">
                        <p className="font-semibold text-red-600">Error while uploading the file. Please try again.</p>
                    </div> : <></>
                }
            </div>
        </div>
    );
}

export default FileUpload;