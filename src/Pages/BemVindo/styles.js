import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    min-height: 100vh;
    background: linear-gradient(to bottom, #beb09a, #c3b195);
`;

export const Navbar = styled.nav`
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(8px);
    position: fixed;
    width: 100%;
    z-index: 10;
`;

export const NavbarContent = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    @media (min-width: 640px) {
        padding: 0 1.5rem;
    }
    @media (min-width: 1024px) {
        padding: 0 2rem;
    }
`;

export const NavbarInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
`;

export const LogoContainer = styled.div`
    flex-shrink: 0;
`;

export const Logo = styled.img`
    height: 3rem;
    width: auto;
    border-radius: 10px;
`;

export const NavLinks = styled.div`
    display: flex;
    gap: 1rem;
`;

export const StyledLink = styled(Link)`
    color: #281811;
    padding: 0.7rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 1.2rem;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        background-color: #c3b195;
        color: white;
    }
`;

export const HeroSection = styled.div`
    height: 100vh;
    background-image: ${(props) => `url(${props.bgImage})`};
    background-size: cover;
    background-position: center;
    background-blend-mode: overlay;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;
export const HeroContent = styled.div`
    text-align: center;
    color: #281811;
    z-index: 10;
`;

export const HeroTitle = styled.h1`
    font-size: 3.75rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

export const HeroSubtitle = styled.p`
    font-size: 1.5rem;
`;

export const CardsSection = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    margin-top: -8rem;
    position: relative;
    z-index: 20;

    @media (min-width: 640px) {
        padding: 0 1.5rem;
    }
    @media (min-width: 1024px) {
        padding: 0 2rem;
    }
`;

export const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const Card = styled.div`
    background-color: #c3b195;
    color: #8b4513;
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 10px solid #8b4513;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: scale(1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        background-color: #663919;
        color: #c3b195;
        border: 4px solid #c3b195;
    }
`;

export const CardIcon = styled.div`
    margin-bottom: 1rem;

    svg {
        width: 3rem;
        height: 3rem;
    }
`;

export const CardTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
    font-size: 1rem;
`;

export const ImagesSection = styled.div`
    max-width: 1280px;
    margin: 4rem auto;
    padding: 0 1rem;

    @media (min-width: 640px) {
        padding: 0 1.5rem;
    }
    @media (min-width: 1024px) {
        padding: 0 2rem;
    }
`;

export const ImagesGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const ImageContainer = styled.div`
    border-radius: 0.5rem;
    border: 6px solid #8b4513;
    overflow: hidden;
`;

export const FeatureImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;

    &:hover {
        opacity: 0.8;
    }
`;
