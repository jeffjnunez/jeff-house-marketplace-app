import { Link } from 'react-router-dom';

import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg';
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';

import addCommasToInteger from '../addCommasToInteger';

const ListingItem = ({ listing, id, onEdit, onDelete }) => {
    return (
        <li className='categoryListing'>
            <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
                <img
                    src={listing.imageUrls[0]}
                    alt={listing.name}
                    className='categoryListingImg'
                />
                <div className='categoryListingDetails'>
                    <p className='categoryListingLocation'>
                        {listing.location}
                    </p>
                    <p className='categoryListingName'>
                        {listing.name}
                    </p>
                    <p className='categoryListingPrice'>
                        ${listing.offer
                            ? addCommasToInteger(listing.discountedPrice)
                            : addCommasToInteger(listing.regularPrice)}
                        {listing.type === 'rent' && ' / Month'}
                    </p>
                    <div className='categoryListingInfoDiv'>
                        <img src={bedIcon} alt='bed' />
                        <p className='categoryListingInfoText'>
                            {`${listing.bedrooms} `}Bedroom{listing.bedrooms > 1 && 's'}
                        </p>
                        <img src={bathtubIcon} alt='bath' />
                        <p className='categoryListingInfoText'>
                            {`${listing.bathrooms} `}Bathroom{listing.bathrooms > 1 && 's'}
                        </p>
                    </div>
                </div>
            </Link>

            {onEdit && (
                <EditIcon
                    className='editIcon'
                    onClick={() => onEdit(id)}
                />
            )}

            {onDelete && (
                <DeleteIcon
                    className='removeIcon'
                    fill='rgb(231, 76, 60)'
                    onClick={() => onDelete(listing.id, listing.name)}
                />
            )}
        </li>
    );
};

export default ListingItem;