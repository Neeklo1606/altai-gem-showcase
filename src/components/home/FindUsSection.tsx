import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

const CONTACTS = [
  {
    title: "Левый берег",
    address: "Новосибирск, ул. Ватутина, 89",
    hours: "пн-вс: 10:00-21:00",
  },
  {
    title: "Правый берег",
    address: "Новосибирск, ул. Кирова, 27",
    hours: "пн-вс: 10:00-21:00",
  },
];

export function FindUsSection() {
  return (
    <section
      id="contacts"
      aria-labelledby="find-us-title"
      style={{ backgroundColor: "#fffdf7", padding: "88px 0" }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-accent-dark)",
            }}
          >
            Как нас найти
          </span>
          <h2
            id="find-us-title"
            className="mt-3 text-4xl md:text-5xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              color: "var(--color-accent)",
              lineHeight: 1.05,
            }}
          >
            Два магазина в Новосибирске и доставка по России
          </h2>

          <div className="mt-8 grid gap-4">
            {CONTACTS.map((contact) => (
              <article
                key={contact.title}
                className="rounded-2xl border p-5"
                style={{
                  borderColor: "rgba(200,150,62,0.22)",
                  backgroundColor: "var(--color-bg-cream)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 18,
                    color: "var(--color-text)",
                  }}
                >
                  {contact.title}
                </h3>
                <p
                  className="mt-3 flex items-start gap-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "var(--color-text)",
                  }}
                >
                  <MapPin size={17} style={{ color: "var(--color-accent-dark)", flexShrink: 0, marginTop: 2 }} />
                  {contact.address}
                </p>
                <p
                  className="mt-2 flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "var(--color-text-muted)",
                  }}
                >
                  <Clock size={17} style={{ color: "var(--color-accent-dark)" }} />
                  {contact.hours}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="tel:+73830000000"
              className="inline-flex items-center justify-center gap-2 rounded-full"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-bg-dark)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 15,
                padding: "13px 22px",
                minHeight: 44,
              }}
            >
              <Phone size={17} />
              Позвонить
            </a>
            <a
              href="mailto:hello@altai-pearl.ru"
              className="inline-flex items-center justify-center gap-2 rounded-full border"
              style={{
                borderColor: "var(--color-accent)",
                color: "var(--color-accent-dark)",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 15,
                padding: "12px 22px",
                minHeight: 44,
              }}
            >
              <Mail size={17} />
              Написать
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
          style={{
            minHeight: 440,
            background:
              "linear-gradient(135deg, rgba(31,58,46,0.94), rgba(194,135,46,0.56)), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1100&q=82&fit=crop')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div
            className="absolute left-[16%] top-[30%] flex items-center gap-2 rounded-full px-4 py-3"
            style={{
              backgroundColor: "#fffdf7",
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 16px 44px rgba(0,0,0,0.22)",
            }}
          >
            <Navigation size={16} style={{ color: "var(--color-accent-dark)" }} />
            Левый берег
          </div>
          <div
            className="absolute right-[12%] top-[58%] flex items-center gap-2 rounded-full px-4 py-3"
            style={{
              backgroundColor: "#fffdf7",
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 16px 44px rgba(0,0,0,0.22)",
            }}
          >
            <Navigation size={16} style={{ color: "var(--color-accent-dark)" }} />
            Правый берег
          </div>
          <div
            className="absolute inset-x-6 bottom-6 rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(255,253,247,0.93)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              Карта показывает ориентиры по районам. Для точного маршрута
              позвоните в магазин, и мы подскажем ближайший вход и парковку.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FindUsSection;
