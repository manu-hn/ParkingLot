export const randomSlotNumberGenerator = () => {
    const slotNumber = Math.floor(Math.random() * 100) + 1
    return slotNumber;
} 

export const randomFloorNumber=()=>{
    const floor = Math.floor(Math.random() * 3)+1;
    return floor;
}