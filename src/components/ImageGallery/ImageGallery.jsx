import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import PropTypes from 'prop-types'
import css from './ImageGallery.module.css'

export const ImageGallery = ({ images, openModal}) => {
return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            openModal={openModal}
          />
        ))}  
    </ul>
)
}

ImageGallery.propTypers = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
    openModal: PropTypes.func.isRequired,
  };
