import pool from '../model/config';

const text = `DELETE FROM users CASCADE;
INSERT INTO users(
    user_id,
    firstname, 
    lastname,
    country,
    email,
    password,
    img,
    reminder,
    created_at
) VALUES(
    '116e6a3c-2528-f165-f78c-94435cea4ab5',
    'Chima',
    'Amodu',
    'Nigeria',
    'chima@amodu.com',
    'Password1@',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg',
    '23:30 PM',
    '2018-09-06T00:47:03.687Z'
), (
    'be151b77-1cbe-431e-0783-f0706489c8aa',
    'Ahmed',
    'Fred',
    'Ghana',
    'ahmed@fred.com',
    'Password1@',
    'https://i.kinja-img.com/gawker-media/image/upload/s--_DBGLHVf--/c_scale,f_auto,fl_progressive,q_80,w_800/eibgv7kctah62iddzywm.jpg',
    '07:00 AM',
    '2018-07-04 22:46:19'
), (
    'a7e48835-9e8c-5f03-494e-cbdbc975f5ec',
    'Ebuka',
    'Jerry',
    'Nigeria',
    'ebuka@gmail.com',
    'Password1@',
    'https://cdn.themodestman.com/wp-content/uploads/2018/01/fp1-mobile-4.jpg',
    '12:00 AM',
    '2018-07-05 22:46:19'
)`;

const users = () => {
  pool.query(text)
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

export default users;
