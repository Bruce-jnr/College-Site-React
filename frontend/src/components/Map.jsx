export default function Map() {
  const url =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2342453967804!2d-2.3191479243148065!3d7.870539706044401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd005c7e7bf6737%3A0xad3bd4c192f4ae3f!2sNsawkaw%20College%20Of%20Education(NSACoE).!5e0!3m2!1sen!2sgh!4v1766858964746!5m2!1sen!2sgh';
  return (
    <section className="my-5 aos-init aos-animate">
      <div className="container-fluid">
        <iframe
          src={url}
          style={{ border: '0', height: '450px', width: '100%' }}
          allowfullscreen="#"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
