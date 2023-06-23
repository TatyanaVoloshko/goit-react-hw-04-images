import { useState, useEffect, useRef } from 'react';

import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from '../service/image-service';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import css from './App.module.css';
import { Modal } from '../Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [tags, setTages] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
    
  const isFirstRender = useRef(true);
 
 useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
 if (query === '') {
   return;
    
 }
getPhotos(query, page);
}, [query, page]);
 
const getPhotos = async (query, page) =>{
   try {
    setIsLoading(true);
    const data = await getImages(query, page);

    if (data.totalHits === 0) {
      return alert('There are no images for your request, try to enter something else.')
    }
    setImages(prevState => [...prevState, ...data.hits]);
      setTotal(data.totalHits);
    
  } catch (error) {
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }

} 
  

  const  onHandleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([])
  };

  const onLoadMore = () => {
    setPage(prevState =>prevState + 1 );
  };

  const openModal = (largeImage, tags) => {
      setShowModal(true);
      setLargeImage(largeImage);
      setTages(tags);
    };
  

  const closeModal = () => {
    setShowModal(false);
    setLargeImage('');
    setTages('');
  };

    const totalPage = total / images.length;
    return (
      <>
        <main className={css.App}>
          <Searchbar onSubmit={onHandleSubmit} />
          {isLoading && <Loader />}
          {images.length === 0 && <p className={css.Title}>Enter your request in the search field, please</p>}
          {images.length !== 0 && (
            <ImageGallery images={images} openModal={openModal} />
          )}
          {totalPage > 1 && !isLoading && images.length !== 0 && (
            <Button onClick={onLoadMore} />
          )}
          {showModal && (
            <div >
              <Modal className={css.Container} tags={tags} largeImage={largeImage} closeModal={closeModal}>
                  <img src={largeImage} alt={tags} />
              </Modal>
            </div>
          )}
        </main>
      </>
    );
  }

