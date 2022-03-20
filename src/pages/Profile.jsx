import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import {
    doc,
    getDocs,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

import ListingItem from '../components/ListingItem';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';

const Profile = () => {
    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);
    const [changeDetails, setChangeDetails] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = formData;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserListings = async () => {
            const listingsRef = collection(db, 'listings');

            const q = query(
                listingsRef,
                where('userRef', '==', auth.currentUser.uid),
                orderBy('timestamp', 'desc')
            );

            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((d) => {
                listings.push({
                    id: d.id,
                    data: d.data(),
                });
            });

            setListings(listings);
            setLoading(false);
        };

        fetchUserListings();
    }, [auth.currentUser.uid]);

    const onLogout = () => {
        auth.signOut();
        navigate('/');
    };

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // Update displayName in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });

                // Update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    name
                });
            }

        } catch (error) {
            toast.error('Could not update profile details.');
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }

    const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`);

    const onDelete = async (listingId) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            await deleteDoc(doc(db, 'listings', listingId));

            const updatedListings = listings.filter((listing) => listing.id !== listingId);
            setListings(updatedListings);
            toast.success('Successfully deleted listing.');
        }

    }

    // TODO make the email field uneditable, or implement
    // actual email changing functionality (might be difficult in firebase)
    return (<div className='profile'>
        <header className='profileHeader'>
            <p className='pageHeader'>My Profile</p>
            <button type='button' className='logOut' onClick={onLogout}>Log Out</button>
        </header>

        <main>
            <div className='profileDetailsHeader'>
                <p className='profileDetailsText'>Personal Details</p>
                <p className='changePersonalDetails' onClick={() => {
                    changeDetails && onSubmit();
                    setChangeDetails((prevState) => !prevState);
                }}>
                    {changeDetails ? 'done' : 'change'}
                </p>
            </div>

            <div className='profileCard'>
                <form>
                    <input
                        type='text'
                        id='name'
                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                        disabled={!changeDetails}
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        type='text'
                        id='email'
                        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                        disabled={!changeDetails}
                        value={email}
                        onChange={onChange}
                    />
                </form>
            </div>

            <Link to='/create-listing' className='createListing'>
                <img src={homeIcon} alt='home' />
                <p>Sell or rent your home</p>
                <img src={arrowRight} alt='arrow right' />
            </Link>

            {!loading && listings?.length > 0 && (<>
                <p className='listingText'>Your Listings</p>
                <ul className='listingsList'>
                    {listings.map((listing) => (
                        <ListingItem
                            key={listing.id}
                            listing={listing.data}
                            id={listing.id}
                            onEdit={() => onEdit(listing.id)}
                            onDelete={() => onDelete(listing.id)}
                        />
                    ))}
                </ul>
            </>)}
        </main>
    </div>);
};

export default Profile;