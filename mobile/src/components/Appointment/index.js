import React, { useMemo, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Config from 'react-native-config';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

function Appointment({ data: appointment, onCancel }) {
  // const dateParsed = useMemo(() => {
  //   return formatRelative(parseISO(appointment.date), new Date(), {
  //     locale: pt,
  //     addSuffix: true,
  //   });
  // }, [appointment.date]);

  const dateParsed = useMemo(() => {
    return format(
      parseISO(appointment.date),
      "dd 'de' MMMM 'de' yyyy ', às' HH:mm",
      {
        locale: pt,
      }
    );
  }, [appointment.date]);

  return (
    <Container past={appointment.past}>
      <Left>
        <Avatar
          source={{
            uri: appointment.provider.avatar
              ? appointment.provider.avatar.url.replace(
                  'localhost',
                  Config.API_URL
                )
              : `https://api.adorable.io/avatar/50/${appointment.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{appointment.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {appointment.cancellable && !appointment.cancelled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

export default Appointment;
