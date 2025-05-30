
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
  const timeSlots = ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'];
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
    <div className="min-h-screen bg-white font-playfair flex flex-col">
      {/* Navbar */}
      <nav className="text-white py-4 px-4 bg-wine-950">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-center tracking-wide">
            Nome do Restaurante
          </h1>
        </div>
      </nav>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Restaurant Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wine-900 mb-3">
                  Faça sua Reserva
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Experience exceptional dining in an elegant atmosphere. Our carefully crafted menu features the finest ingredients and innovative culinary techniques.
                </p>
              </div>

              <Card className="border-none shadow-md bg-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-wine-900 text-lg font-semibold">
                    <MapPin className="mr-3 h-5 w-5" />
                    Localização & Horários
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-wine-800 mb-2">Endereço</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Rua Gourmet Boulevard, 123<br />
                      Centro, Cidade 12345<br />
                      Telefone: (11) 1234-5678
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-wine-800 mb-2">Horário de Funcionamento</h4>
                    <div className="space-y-1 text-gray-600 text-sm">
                      <p><span className="font-medium">Segunda - Sábado:</span> 12:00 - 22:00</p>
                      <p><span className="font-medium">Domingo:</span> Fechado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Reservation Form */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader className="text-white text-center py-6 bg-[#5e0b16]">
                    <CardTitle className="text-xl font-semibold">Reserve Sua Mesa</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Horizontal Row for Date, Time, and People */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Date Picker */}
                        <div className="space-y-3">
                          <Label htmlFor="date" className="text-wine-800 font-medium text-sm uppercase tracking-wide">
                            Data
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className={cn("w-full justify-start text-left font-normal border-gray-200 hover:border-wine-300 h-12", !date && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "dd/MM") : <span className="text-sm">Selecione</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={date} onSelect={setDate} disabled={date => date < new Date()} initialFocus className="pointer-events-auto" />
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Time Picker */}
                        <div className="space-y-3">
                          <Label htmlFor="time" className="text-wine-800 font-medium text-sm uppercase tracking-wide">
                            Horário
                          </Label>
                          <Select value={time} onValueChange={setTime}>
                            <SelectTrigger className="border-gray-200 hover:border-wine-300 h-12">
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Horário" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map(slot => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Number of People */}
                        <div className="space-y-3">
                          <Label htmlFor="people" className="text-wine-800 font-medium text-sm uppercase tracking-wide">
                            Pessoas
                          </Label>
                          <Select value={people} onValueChange={setPeople}>
                            <SelectTrigger className="border-gray-200 hover:border-wine-300 h-12">
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Qtd" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-3">
                        <Label htmlFor="notes" className="text-wine-800 font-medium text-sm uppercase tracking-wide">
                          Observações
                        </Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Restrições alimentares, ocasiões especiais..." 
                          value={notes} 
                          onChange={e => setNotes(e.target.value)} 
                          className="min-h-[80px] border-gray-200 hover:border-wine-300 focus:border-wine-500 resize-none text-base" 
                        />
                      </div>

                      {/* Submit Button */}
                      <Button 
                        type="submit" 
                        disabled={!date || !time || !people} 
                        className="w-full text-white py-4 text-base font-medium transition-all duration-200 mt-8 bg-wine-950 hover:bg-wine-800"
                      >
                        Confirmar Reserva
                      </Button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-6 font-light">
                      Você receberá a confirmação em até 15 minutos.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white py-3 px-4 bg-wine-950">
        <div className="container mx-auto">
          <p className="text-center text-sm">
            © 2024 Nome do Restaurante. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReservationScreen;
