// import userThree from '../images/user/user-03.png';

const Funcionario = () => {
    return (
        <div className="mx-auto max-w-270">

            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                    <div
                        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-7">
                            <form action="#">
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="name"
                                        >
                                            Nombre
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Nombre"
                                            defaultValue=""
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="lastname"
                                        >
                                            Apellido
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            placeholder="Apellido"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>

                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="ci"
                                    >
                                        CI:
                                    </label>
                                    <div className="relative">

                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="ci"
                                            id="ci"
                                            placeholder="# de Carnet"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>

                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="celular"
                                    >
                                        Celular:
                                    </label>
                                    <div className="relative">

                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="celular"
                                            id="celular"
                                            placeholder="# de Celular"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>

                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">

                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Email"
                                            defaultValue=""
                                        />
                                    </div>
                                </div>


                                <div className="flex justify-end gap-4.5">
                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        type="submit"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="inline-flex items-center justify-center rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                                        type="submit"
                                    >
                                        Registrar Funcionario
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/*<div className="col-span-5 xl:col-span-2">*/}
                {/*    <div*/}
                {/*        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">*/}
                {/*         */}
                {/*        <div className="p-7">*/}
                {/*            <form action="#">*/}
                {/*                <div className="mb-4 flex items-center gap-3">*/}
                {/*                    <div className="h-14 w-14 rounded-full">*/}
                {/*                        /!*<img src={userThree} alt="User"/>*!/*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*      <span className="mb-1.5 text-black dark:text-white">*/}
                {/*        Edit your photo*/}
                {/*      </span>*/}
                {/*                        <span className="flex gap-2.5">*/}
                {/*        <button className="text-sm hover:text-primary">*/}
                {/*          Delete*/}
                {/*        </button>*/}
                {/*        <button className="text-sm hover:text-primary">*/}
                {/*          Update*/}
                {/*        </button>*/}
                {/*      </span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div*/}
                {/*                    id="FileUpload"*/}
                {/*                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"*/}
                {/*                >*/}
                {/*                    <input*/}
                {/*                        type="file"*/}
                {/*                        accept="image/*"*/}
                {/*                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"*/}
                {/*                    />*/}
                {/*                    <div className="flex flex-col items-center justify-center space-y-3">*/}
                {/*       */}
                {/*                        <p>*/}
                {/*                            <span className="text-primary">Click to upload</span> or*/}
                {/*                            drag and drop*/}
                {/*                        </p>*/}
                {/*                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>*/}
                {/*                        <p>(max, 800 X 800px)</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div className="flex justify-end gap-4.5">*/}
                {/*                    <button*/}
                {/*                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"*/}
                {/*                        type="submit"*/}
                {/*                    >*/}
                {/*                        Cancel*/}
                {/*                    </button>*/}
                {/*                    <button*/}
                {/*                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"*/}
                {/*                        type="submit"*/}
                {/*                    >*/}
                {/*                        Save*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            </form>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </div>

    );
};

export default Funcionario;
