
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface CardType {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

const LoveGame = () => {
  const { toast } = useToast();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Oyun kartlarını başlat
  useEffect(() => {
    const cardValues = ['❤️', '💖'];
    const duplicatedValues = [...cardValues, ...cardValues];
    
    const shuffledCards = duplicatedValues
      .map((value, index) => ({ id: index, value, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
  }, []);

  // Kart çevirme işlemi
  const handleCardClick = (clickedCardId: number) => {
    // Zaten eşleşen veya çevrilen kartları kontrol et
    if (
      cards[clickedCardId].matched || 
      cards[clickedCardId].flipped || 
      flippedCards.length >= 2
    ) {
      return;
    }

    // Karta tıklandığında çevir
    const newCards = [...cards];
    newCards[clickedCardId].flipped = true;
    setCards(newCards);
    
    // Çevrilen kartları takip et
    const newFlippedCards = [...flippedCards, clickedCardId];
    setFlippedCards(newFlippedCards);
    
    // İki kart çevrildiyse karşılaştır
    if (newFlippedCards.length === 2) {
      const [firstCardId, secondCardId] = newFlippedCards;
      
      // Hamle sayısını artır
      setMoves(moves + 1);
      
      // Kartlar eşleşiyor mu?
      if (cards[firstCardId].value === cards[secondCardId].value) {
        // Eşleşen kartları işaretle
        setTimeout(() => {
          const updatedCards = [...cards];
          updatedCards[firstCardId].matched = true;
          updatedCards[secondCardId].matched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          
          // Tüm kartlar eşleşti mi?
          const allMatched = updatedCards.every(card => card.matched);
          if (allMatched) {
            setGameCompleted(true);
            toast({
              title: "Tebrikler!",
              description: "Ödül olarak benim sonsuz aşkımı ve öpücüğümü kazandın!",
            });
          }
        }, 500);
      } else {
        // Eşleşmeyen kartları çevir
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCardId].flipped = false;
          resetCards[secondCardId].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Oyunu sıfırla
  const resetGame = () => {
    const cardValues = ['❤️', '💖'];
    const duplicatedValues = [...cardValues, ...cardValues];
    
    const shuffledCards = duplicatedValues
      .map((value, index) => ({ id: index, value, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameCompleted(false);
  };

  return (
    <div className="my-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {gameCompleted ? 'Tebrikler! 🎉' : 'Oyunu Tamamla Ödülü Kap'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gameCompleted ? (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium text-love-500">
                Ödül olarak benim sonsuz aşkımı ve öpücüğümü kazandın!
              </p>
              <div className="flex justify-center">
                <span className="text-6xl animate-heart-beat">💋</span>
              </div>
              <Button onClick={resetGame} className="mt-4">Tekrar Oyna</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 md:gap-4 md:w-64 mx-auto">
                {cards.map(card => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square flex items-center justify-center text-3xl md:text-4xl rounded-lg cursor-pointer transition-all duration-300 ${
                      card.flipped || card.matched 
                        ? 'bg-white shadow-md rotate-0'
                        : 'bg-primary text-primary-foreground rotate-y-180'
                    }`}
                  >
                    {(card.flipped || card.matched) ? card.value : ''}
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <p>Hamle: {moves}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoveGame;
