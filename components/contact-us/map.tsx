export default function Map() {
  const address = encodeURIComponent(
    "105 Brianna Drive, Fredericton, NB E3C 0R2, Canada",
  );

  return (
    <section className="w-11/12 pt-16 mx-auto md:w-11/12 lg:w-10/12 ">
      <div className="overflow-hidden border shadow-lg rounded-xl border-border lg:h-[60vh] md:h-[50vh] h-[40vh]">
        <iframe
          title="Constant Care Family Services Location"
          src={`https://maps.google.com/maps?q=${address}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
          width="100%"
          height="500"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
      </div>
    </section>
  );
}
