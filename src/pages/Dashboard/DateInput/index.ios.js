import React, { useState, useMemo } from 'react';
import { DatePickerIOS, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  return (
    <Container>
      <TouchableOpacity onPress={() => setOpened(!opened)}>
        <DateText>{dateFormatted}</DateText>
      </TouchableOpacity>

      {opened && (
        <Picker>
          <DatePickerIOS
            date={date}
            onDateChange={onChange}
            minimumDate={new Date()}
            minuteInterval={60}
            locale="pt"
            mode="date"
          />
        </Picker>
      )}
    </Container>
  );
}
