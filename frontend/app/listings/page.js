export function Button({ children, className = "", onClick }) {
    return (
      <button
        className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  
  export function Card({ children, className = "" }) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }
  
  const properties = [
    {
      id: 1,
      name: "Luxury Villa in LA",
      location: "Los Angeles, USA",
      price: "5 ETH",
      totalTokens: 1000,
      userHolding: 50,
      image: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg"
    },
    {
      id: 2,
      name: "Modern Apartment in NYC",
      location: "New York, USA",
      price: "3.2 ETH",
      totalTokens: 800,
      userHolding: 20,
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
    },
    {
      id: 3,
      name: "Beach House in Miami",
      location: "Miami, USA",
      price: "4.5 ETH",
      totalTokens: 1200,
      userHolding: 100,
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg"
    },
    {
      id: 4,
      name: "Countryside Mansion",
      location: "Tuscany, Italy",
      price: "6 ETH",
      totalTokens: 1500,
      userHolding: 70,
      image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    },
    {
      id: 5,
      name: "Skyline Penthouse",
      location: "Dubai, UAE",
      price: "8 ETH",
      totalTokens: 1800,
      userHolding: 90,
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
    }
  ];
  
  export default function TokenizedProperties() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Listed Estates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="">
              <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
              <CardContent>
                <h3 className="text-xl font-semibold">{property.name}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-lg font-medium mt-2">Price: {property.price}</p>
                <p className="text-sm text-gray-500">Total Tokens: {property.totalTokens}</p>
                <p className="text-sm text-gray-500">Your Holdings: {property.userHolding} tokens</p>
                <Button className="mt-4 w-full">Buy Tokens</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  