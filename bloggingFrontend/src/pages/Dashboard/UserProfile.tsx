import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import ProfileForm from "./components/ProfileForm";
import { UserProfileImage } from "./components/ProfileImageUpload";
import{ UserCoverImage } from "./components/CoverImageUpload";

export default function UserProfile() {
    const [update, setUpdate] = useState(false);

    const { user,fetchAuthStatus } = useAuth();

    return (
        <>
            <div>
                {
                    update === true ? (
                        <ProfileForm user={user} update={update} setUpdate={setUpdate} fetchAuthStatus={fetchAuthStatus} />
                    ) : (
                        <Profile user={user} update={update} setUpdate={setUpdate} />
                    )
                }
            </div>

        </>
    )
}



const Profile = ({ update, setUpdate, user }) => {

    const avatar = user?.profileImage || "https://www.iconpacks.net/icons/2/free-icon-user-3297.png";
    const coverImage = user?.coverImage;

    const [open, setOpen] = useState(false)
    const [openCoverImage, setOpenCoverImage] = useState(false)
    return (
        <section className="w-full overflow-hidden dark:bg-gray-900">
            <div className="flex flex-col relative">

                {/* Cover Image */}
                <div className="relative border-b-3 border-orange-600">
                    <img
                        alt="User Cover"
                        src={coverImage}
                        className="w-full xl:h-[16rem] lg:h-[16rem] md:h-[16rem] sm:h-[14rem] h-[11rem] object-cover"
                    />
                    <span onClick={() => setOpenCoverImage(true)} className="absolute  top-2 z-10 right-2 bg-gray-300/50 hover:bg-amber-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                    </span>
                    <div className="bg-transparent hover:bg-white/5 w-full h-full top-0 absolute"></div>
                    <UserCoverImage openCoverImage={openCoverImage} setOpenCoverImage={setOpenCoverImage} coverImage_Url={coverImage} />
                </div>


                {/* Profile Image and Name */}
                <div className="sm:w-[80%] w-[90%] mx-auto flex relative">
                    <img src={avatar} className="bg-black rounded-md lg:w-[10rem] lg:h-[10rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] w-[7rem] h-[7rem] border-3 border-amber-600 relative lg:bottom-[5rem] sm:bottom-[4rem] bottom-[3rem]"
                    />
                    <span onClick={() => setOpen(true)} className="absolute -top-16 left-32 bg-gray-300/50 hover:bg-amber-100"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                    </span>
                    <UserProfileImage open={open} setOpen={setOpen} avatar={avatar} />

                    <h1 className="w-full text-left my-4 sm:mx-4 pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl text-xl font-serif">
                        {user?.username}
                    </h1>
                    <button className="p-2 text-sm absolute top-0 right-0 border-orange-600 text-white border-2 hover:bg-orange-600 my-3 rounded" onClick={() => setUpdate(true)}>
                        Update
                    </button>
                </div>

                {/* Details Section */}
                <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 -top-4">
                    {/* Description */}
                    <p className="w-fit text-gray-700 dark:text-gray-400 text-md">
                        {user?.bio}
                        {/* User Profile Samuel Abera Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic eligendi vitae animi nam in, est earum culpa illum aliquam. */}
                    </p>

                    {/* Personal Info */}
                    <div className="w-full py-6 flex flex-col justify-center gap-2">
                        <div className="w-full flex sm:flex-row flex-col gap-2 justify-center">
                            {/* Left Column */}
                            <div className="w-full">
                                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                    <InfoItem label="First Name" value={user?.firstname} />
                                    <InfoItem label="Last Name" value={user?.lastname} />
                                    <InfoItem label="Email" value={user?.email} />
                                    <InfoItem label="Gender" value="Male" />
                                </dl>
                            </div>
                            {/* Right Column */}
                            <div className="w-full">
                                <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                    <InfoItem label="Location" value={user?.addresses.map((item) => (<span key={item[0]}>{item.country},{item.street}</span>))} />
                                    <InfoItem label="Phone Number" value={user?.contact} />
                                    <InfoItem label="Email" value={user?.email} />
                                    <InfoItem
                                        label="Website"
                                        value={
                                            <a
                                                href="https://www.teclick.com"
                                                className="hover:text-blue-500"
                                            >
                                                https://www.teclick.com
                                            </a>
                                        }
                                    />
                                </dl>
                            </div>
                        </div>

                        {/* Map */}

                    </div>

                    {/* Social Links */}
                    <SocialLinks />
                </div>
            </div>
        </section>
    );
};

const InfoItem = ({ label, value }) => (
    <div className="flex flex-col py-3">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{label}</dt>
        <dd className="text-lg font-semibold">{value}</dd>
    </div>
);

const SocialLinks = () => (
    <div className="fixed right-2 bottom-20 flex flex-col rounded-sm bg-gray-200 text-gray-500 dark:bg-gray-200/80 dark:text-gray-700 hover:text-gray-600 hover:dark:text-gray-400">
        {[
            {
                href: "https://www.linkedin.com/in/samuel-abera-6593a2209/",
                iconColor: "text-blue-500",
                icon: (
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    />
                ),
            },
            {
                href: "https://twitter.com/Samuel7Abera7",
                iconColor: "text-gray-900",
                icon: (
                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Z" />
                ),
            },
            {
                href: "#",
                iconColor: "text-blue-700",
                icon: (
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                    />
                ),
            },
            {
                href: "https://www.youtube.com/@silentcoder7",
                iconColor: "text-red-600",
                icon: (
                    <path
                        fillRule="evenodd"
                        d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964..."
                    />
                ),
            },
        ].map((link, index) => (
            <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                <div className="p-2">
                    <svg
                        className={`lg:w-6 lg:h-6 w-4 h-4 ${link.iconColor}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {link.icon}
                    </svg>
                </div>
            </a>
        ))}
    </div>
);


