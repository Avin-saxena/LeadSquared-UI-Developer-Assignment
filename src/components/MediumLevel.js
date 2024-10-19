import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Modal,
  Pagination,
  Button,
  Carousel,
} from 'react-bootstrap';
import {
  FaArrowUp,
  FaChevronUp,
  FaChevronDown,
  FaExpand,
  FaCompress,
} from 'react-icons/fa'; 
import '../App.css'; 

function MediumLevel() {
  const [cats, setCats] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [hasMoreData, setHasMoreData] = useState(true); 
  const [isModalFullscreen, setIsModalFullscreen] = useState(false); 

  const modalContentRef = useRef(); 

  // fetching cat images from the API
  const fetchCats = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=15&page=${pageNum}&order=Desc`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.length === 0) {
        
        setHasMoreData(false);
        return;
      }

      setCats(data);
    } catch (err) {
      setError(err.message);
      setCats([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCats(page);
  }, [page, fetchCats]);

  const handlePageClick = useCallback((pageNum) => {
    setPage(pageNum);
  }, []);

  const handleNext = useCallback(() => {
    if (!loading && hasMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMoreData]);

  const handlePrevious = useCallback(() => {
    if (!loading && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [loading, page]);

  const handleHomeClick = useCallback(() => {
    setPage(1);
    setHasMoreData(true);
  }, []);

  // implementing modal view
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


  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // fullscreen option inside modal view
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

  
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 10;
    const halfRange = Math.floor(maxPageNumbersToShow / 2);

    let startPage = page - halfRange;
    let endPage = page + halfRange;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageNumbersToShow;
    }



    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [page]);

  return (
    <Container className="mt-4 position-relative">
     
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={handleHomeClick}>
          Home
        </Button>
        <h1 className="text-center mb-0">Cat Gallery - Medium Level</h1>
        <div></div> 
      </div>

     
      {error && (
        <Alert variant="danger" className="text-center">
          Error: {error}
        </Alert>
      )}

     
      {!error && cats.length === 0 && !loading && (
        <p className="text-center">No cats available.</p>
      )}

      {/* cat cards */}
      <Row>
        {cats.map((cat, index) => (
          <Col key={cat.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <MemoizedCatCard cat={cat} onClick={() => handleShowModal(index)} />
          </Col>
        ))}
      </Row>

 
      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* pagination */}
      {!loading && !error && (
        <div className="d-flex justify-content-center my-3">
          <Pagination>
            <Pagination.Prev
              onClick={handlePrevious}
              disabled={page === 1 || loading}
            />
            {getPageNumbers().map((pageNum) => (
              <Pagination.Item
                key={pageNum}
                active={pageNum === page}
                onClick={() => handlePageClick(pageNum)}
                disabled={loading}
              >
                {pageNum}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={handleNext}
              disabled={!hasMoreData || loading}
            />
          </Pagination>
        </div>
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

export default MediumLevel;

// implementing memoized catcard component
const CatCard = ({ cat, onClick }) => {
  return (
    <Card
      className="h-100 shadow-sm"
      onClick={onClick}
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
  );
};

const MemoizedCatCard = React.memo(CatCard);
