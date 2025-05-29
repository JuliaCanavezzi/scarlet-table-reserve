
import React, { useState } from 'react';
import { CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ReservationScreen = () => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [notes, setNotes] = useState('');

  const timeSlots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', {
      date,
      time,
      people,
      notes
    });
  };

  return (
    <div className="min-h-screen bg-white font-playfair">
      {/* Navbar */}
      <nav className="bg-wine-900 text-white py-3 px-4 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-center tracking-wide">
            Nome do Restaurante
          </h1>
        </div>
      </nav>

      {/* Restaurant Image */}
      <div className="w-full h-32 md:h-40 relative overflow-hidden">
        <img 
          src="https://www.kauaiexclusive.com/wp-content/uploads/2021/09/gallery-5-1500x630.jpg" 
          alt="Bella Vista Restaurant Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Side - Restaurant Information */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-wine-900 mb-3 leading-tight">
                Faça sua Reserva
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                Experience exceptional dining in an elegant atmosphere. Our carefully crafted menu features the finest ingredients and innovative culinary techniques.
              </p>
            </div>

            <Card className="border-none shadow-sm bg-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-wine-900 text-base font-semibold">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location & Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-wine-800 mb-1 text-sm">Address</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    123 Gourmet Boulevard<br />
                    Downtown District, City 12345<br />
                    Phone: (555) 123-4567
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-wine-800 mb-1 text-sm">Business Hours</h4>
                  <div className="space-y-1 text-gray-600 text-xs">
                    <p><span className="font-medium">Monday - Saturday:</span> 12:00 PM - 10:00 PM</p>
                    <p><span className="font-medium">Sunday:</span> Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Reservation Form */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-md">
              <Card className="border-none shadow-lg bg-white">
                <CardHeader className="bg-wine-900 text-white text-center py-4">
                  <CardTitle className="text-lg font-semibold">Reserve Sua Mesa</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date Picker */}
                    <div className="space-y-1">
                      <Label htmlFor="date" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Data
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal border-gray-200 hover:border-wine-300 py-3 h-9",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span className="text-xs">Select a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Time Picker */}
                    <div className="space-y-1">
                      <Label htmlFor="time" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Horário
                      </Label>
                      <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="border-gray-200 hover:border-wine-300 h-9">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select a time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Number of People */}
                    <div className="space-y-1">
                      <Label htmlFor="people" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Quantidade de Pessoas
                      </Label>
                      <Select value={people} onValueChange={setPeople}>
                        <SelectTrigger className="border-gray-200 hover:border-wine-300 h-9">
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select party size" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Person' : 'People'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Notes */}
                    <div className="space-y-1">
                      <Label htmlFor="notes" className="text-wine-800 font-medium text-xs uppercase tracking-wide">
                        Observações:
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Dietary restrictions, special occasions..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-[60px] border-gray-200 hover:border-wine-300 focus:border-wine-500 resize-none text-xs"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-wine-900 hover:bg-wine-800 text-white py-3 text-xs font-medium transition-all duration-200 mt-5"
                      disabled={!date || !time || !people}
                    >
                       Confirmar Reserva
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-3 font-light">
                    Você receberá a confirmação em até 15 minutos.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationScreen;
