import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Spinner,
  Container,
  Card,
  Modal,
  Alert,
  Button,
} from 'react-bootstrap';
import {
  FaArrowUp,
  FaChevronUp,
  FaChevronDown,
  FaExpand,
  FaCompress,
} from 'react-icons/fa'; 
import '../App.css'; 

function HardLevel() {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isModalFullscreen, setIsModalFullscreen] = useState(false); 

  const observer = useRef();
  const lastCatElementRef = useRef();
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  // implementing infinite scroll
  useEffect(() => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (lastCatElementRef.current) {
      observer.current.observe(lastCatElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading]);

  // implementing modal 
  const handleShowModal = useCallback((index) => {
    setCurrentIndex(index);
    setShowModal(true);
  }, []);

  
  const handleNavigateUp = useCallback(() => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, []);

  const handleNavigateDown = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, cats.length - 1)
    );
  }, [cats.length]);

 
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
      <h1 className="text-center mb-4">Cat Gallery - Infinite Scroll</h1>

 
      {error && (
        <Alert variant="danger" className="text-center">
          Error: {error}
        </Alert>
      )}

      
      {!error && cats.length === 0 && !loading && (
        <p className="text-center">No cats available.</p>
      )}

      {/* displaying cat cards */}
      {cats.map((cat, index) => {
        const isLastElement = cats.length === index + 1;

        return (
          <MemoizedCatCard
            key={cat.id}
            cat={cat}
            ref={isLastElement ? lastCatElementRef : null}
            onClick={() => handleShowModal(index)}
          />
        );
      })}

    
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
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

     
      {showModal && cats.length > 0 && (
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
          
            <img
              src={cats[currentIndex].url}
              alt={`Cat ${cats[currentIndex].id}`}
              className="img-fluid mb-3"
              style={{ maxHeight: '80vh', width: '100%', objectFit: 'contain' }}
            />

        
            <div className="vertical-navigation">
              <Button
                variant="light"
                onClick={handleNavigateUp}
                disabled={currentIndex === 0}
                aria-label="Previous Image"
                className="nav-button up-button"
              >
                <FaChevronUp />
              </Button>
              <Button
                variant="light"
                onClick={handleNavigateDown}
                disabled={currentIndex === cats.length - 1}
                aria-label="Next Image"
                className="nav-button down-button"
              >
                <FaChevronDown />
              </Button>
            </div>

     
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

export default HardLevel;

// implementing memoized catcard component
const CatCard = React.forwardRef(({ cat, onClick }, ref) => {
  return (
    <Card
      ref={ref}
      className="mb-4 mx-auto shadow-sm"
      style={{ maxWidth: '600px', cursor: 'pointer' }}
      onClick={onClick}
    >
      <Card.Img
        variant="top"
        src={cat.url}
        alt="Cat"
        loading="lazy"
        style={{ height: '400px', objectFit: 'cover' }}
      />
    </Card>
  );
});

const MemoizedCatCard = React.memo(CatCard);
