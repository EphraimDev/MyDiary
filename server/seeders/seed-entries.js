import pool from '../model/config';

const text = `DELETE FROM entries CASCADE;
INSERT INTO entries(
    user_id,
    entry_id,
    title,
    entry,
    date,
    time,
    img,
    created_at
) VALUES(
    '116e6a3c-2528-f165-f78c-94435cea4ab5',
    '2e00bcef-d3af-9d13-6b85-e9b30a043e28',
    'I hate Tuesdays!',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
    '09-07-2018',
    '17:28 PM',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg',
    '2018-09-06T00:47:03.687Z'
), (
    'be151b77-1cbe-431e-0783-f0706489c8aa',
    'gsk57w62-d3af-6y78-6b85-e9b30a043e28',
    'Learnt Something New Today',
    'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    '10-07-2018',
    '08:00 AM',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Liliumbulbiferumflowertop.jpg/220px-Liliumbulbiferumflowertop.jpg',
    '2018-07-04 22:46:19'
)`;

const entries = () => {
      pool.query(text)
      .then(response =>console.log(response))
      .catch (err => console.error(err)) 
    }  

export default entries;