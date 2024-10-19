import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Spinner,
  Container,
  Alert,
  Modal,
  Button,
  Carousel,
  Card,       
} from 'react-bootstrap';
import { FaArrowUp, FaExpand, FaCompress } from 'react-icons/fa';
import '../App.css';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function EasyLevel() {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [hasMore, setHasMore] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isModalFullscreen, setIsModalFullscreen] = useState(false); 

  const modalContentRef = useRef(); 

  // fetching cat images from the API
  const fetchCats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}&order=Desc`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setCats((prevCats) => [...prevCats, ...data]);

      
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message);
      setCats([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // fetching cat images when user clicks on show more button
  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  
  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

 //modal implementation
  const handleShowModal = useCallback((index) => {
    setCurrentIndex(index);
    setShowModal(true);
  }, []);

  
  const handleSelect = useCallback((selectedIndex) => {
    setCurrentIndex(selectedIndex);
  }, []);


  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    if (isModalFullscreen) {
      exitModalFullscreen();
    }
  }, [isModalFullscreen]);


  const handleScroll = useCallback(() => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // scroll up arrow button
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // fullscreen option inside modal
  const toggleModalFullscreen = useCallback(() => {
    if (!isModalFullscreen) {
      if (modalContentRef.current.requestFullscreen) {
        modalContentRef.current.requestFullscreen();
      } else if (modalContentRef.current.mozRequestFullScreen) { 
        modalContentRef.current.mozRequestFullScreen();
      } else if (modalContentRef.current.webkitRequestFullscreen) { 
        modalContentRef.current.webkitRequestFullscreen();
      } else if (modalContentRef.current.msRequestFullscreen) { 
        modalContentRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { 
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { 
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { 
        document.msExitFullscreen();
      }
    }
  }, [isModalFullscreen]);

  
  const exitModalFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }, []);

  
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
    
      if (
        fsElement === modalContentRef.current ||
        fsElement === modalContentRef.current?.parentElement
      ) {
        setIsModalFullscreen(true);
      } else {
        setIsModalFullscreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <Container className="mt-4 position-relative">
      <h1 className="text-center mb-4">Cat Gallery</h1>

      
      {error && (
        <Alert variant="danger" className="text-center">
          Error: {error}
        </Alert>
      )}

      
      {!error && cats.length === 0 && !loading && (
        <p className="text-center">No cats available.</p>
      )}

  
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {cats.map((cat, index) => (
          <Card
            key={cat.id}
            className="mb-4 shadow-sm"
            onClick={() => handleShowModal(index)}
            style={{ cursor: 'pointer' }}
          >
            <Card.Img
              variant="top"
              src={cat.url}
              alt="Cat"
              loading="lazy"
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </Card>
        ))}
      </Masonry>

   
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

     
      {!loading && hasMore && (
        <div className="text-center my-3">
          <Button variant="primary" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}

     
      {showBackToTop && (
        <Button
          variant="primary"
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
          }}
        >
          <FaArrowUp />
        </Button>
      )}

     
      {showModal && cats[currentIndex] && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          size="lg"
          aria-labelledby="modal-title"
          dialogClassName={isModalFullscreen ? 'modal-fullscreen' : ''}
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-title">Cat ID: {cats[currentIndex].id}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="carousel-container position-relative"
            ref={modalContentRef} 
          >
            {/* carousel */}
            <Carousel activeIndex={currentIndex} onSelect={handleSelect}>
              {cats.map((cat, idx) => (
                <Carousel.Item key={cat.id}>
                  <img
                    src={cat.url}
                    alt={`Cat ${cat.id}`}
                    className="d-block w-100"
                    style={{ maxHeight: '80vh', objectFit: 'contain' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            
            <Button
              variant="secondary"
              onClick={toggleModalFullscreen}
              className="fullscreen-toggle-modal"
              aria-label={isModalFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isModalFullscreen ? <FaCompress /> : <FaExpand />}
            </Button>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}

export default EasyLevel;


