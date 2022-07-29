import { useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from '../../redux/myContactsSlice';
import s from './contactForm.module.css';

export default function ContactForm() {
  const [addContacts, { isLoading }] = useAddContactMutation();
  const { data: contacts } = useGetContactsQuery();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleNameChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const fetchNewContact = async e => {
    try {
      await addContacts({ name, phone });
      toast.success('Contact added successfully');
    } catch (err) {
      toast.error('Error');
      console.error(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nameContact = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (nameContact) {
      toast.error(`${name} is already in contact`);
      return;
    } else {
      fetchNewContact();
      setName('');
      setPhone('');
    }
  };

  return (
    <form className={s.form} action="submit" onSubmit={handleSubmit}>
      <label className={s.label}>
        <span className={s.formSpan}> Name</span>
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>

      <label className={s.label}>
        <span className={s.formSpan}>Number</span>
        <input
          className={s.input}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleNameChange}
        />
      </label>
      <button type="submit" className={s.button}>
        Add Contact
      </button>
      {isLoading && (
        <ThreeCircles
          height="50"
          width="50"
          color="violet"
          outerCircleColor="grey"
          middleCircleColor="violet"
          innerCircleColor="grey"
        />
      )}
    </form>
  );
}
