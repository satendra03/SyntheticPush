// src/app/components/profile.tsx
"use client"
import Image from "next/image";

export const Profile = () => {
    return (
        <div className="profile">
            <div className="profile-image">
                <Image src="/images/profile.jpg" alt="profile" width={100} height={100} />
            </div>
        </div>
    )
}