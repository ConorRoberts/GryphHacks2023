export const scrollDown = () => {
    const scrollAmount = window.innerHeight;

    window.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
    });
};
