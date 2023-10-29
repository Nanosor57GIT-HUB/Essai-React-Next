"use client";

import { useTheme } from "@/app/context/themecontext";
import Image from "next/image";
import { Interfont } from "@/app/style.font";

const CV = () => {
  const { theme } = useTheme();

  return (
    <main className="mainpages">
      <div
        className="pagecv"
        style={{
          background: theme.background,
        }}
      >
        <h1
          className={`title ${Interfont.className}`}
          style={{
            color: theme.color,
          }}
        >
          Vous êtes sur la page CV
        </h1>
        <Image
        //  priority={true}
          src="/images/robots/robot2.webp"
          alt="robot2"
          className="robot2"
          width={309}
          height={387}
        />
        <div className="blocresumecv">
          <h2
            id="1cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Résumé professionnel
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Aliquam ex diam, pretium eu odio quis, euismod scelerisque nunc.
            Etiam laoreet vulputate risus at malesuada. Aenean elementum, dolor
            ut tincidunt faucibus, sapien tellus egestas felis, at pulvinar mi
            nisl ac dui. Nam ullamcorper facilisis lectus, id convallis enim
            iaculis gravida. Quisque mollis ullamcorper nulla, eget facilisis
            magna facilisis ac. Donec porttitor, sem at commodo molestie, justo
            risus pulvinar justo, ut commodo turpis justo in ex. Mauris nec
            augue a libero hendrerit sagittis. Donec magna metus, tincidunt a
            ultrices non, placerat a nulla. Ut varius sapien est, et mattis odio
            imperdiet ac. Duis dictum risus ut commodo suscipit. Nullam luctus
            lacus felis, rhoncus lobortis elit tristique semper. Suspendisse
            potenti. Vestibulum eu feugiat libero. In placerat euismod nisi ac
            pulvinar, justo risus pulvinar justo, ut commodo turpis justo in ex.
            Mauris nec augue a libero hendrerit sagittis. Donec magna metus,
            tincidunt a ultrices non, placerat a nulla. Ut varius sapien est, et
            mattis odio imperdiet ac. Duis dictum risus ut commodo suscipit.
            Nullam luctus lacus felis, rhoncus lobortis elit tristique semper.
            Suspendisse potenti. Vestibulum eu feugiat libero. In placerat
            euismod nisi ac pulvinar.
          </p>
        </div>
        <div className="blocresumecv">
          <h2
            id="2cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Compétences Techniques
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Nam vitae enim sodales, hendrerit erat a, laoreet nulla. Etiam
            ultricies, leo sed mattis viverra, lacus erat molestie augue, ut
            posuere ex velit eget ligula. Interdum et malesuada fames ac ante
            ipsum primis in faucibus. Ut sollicitudin tristique bibendum. Aenean
            vel sagittis ipsum. Vestibulum vel ante id lectus bibendum elementum
            et sed nisi. Duis sed facilisis elit. Sed aliquam enim tellus,
            semper hendrerit erat lacinia vel. Phasellus molestie, justo non
            vulputate porttitor, tortor lorem semper turpis, vel bibendum nibh
            metus a quam. Vestibulum at nibh iaculis, porta diam placerat,
            fringilla mi. Cras vel auctor mauris. Fusce volutpat massa et erat
            viverra, dignissim rhoncus mauris lobortis. Integer molestie, augue
            et molestie aliquet, nunc mi tristique sem, sollicitudin aliquam
            neque risus a lorem. Proin vitae ipsum pellentesque, suscipit augue
            eu, dignissim nulla. Nam vitae enim sodales, hendrerit erat a,
            laoreet nulla. Etiam ultricies, leo sed mattis viverra, lacus erat
            molestie augue, ut posuere ex velit eget ligula. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Ut sollicitudin
            tristique bibendum. Aenean vel sagittis ipsum. Vestibulum vel ante
            id lectus bibendum elementum et sed nisi. Duis sed facilisis elit.
            Sed aliquam enim tellus, semper hendrerit erat lacinia vel.
            Phasellus molestie, justo non vulputate porttitor, tortor lorem
            semper turpis, vel bibendum nibh metus a quam. Vestibulum at nibh
            iaculis, porta diam placerat, fringilla mi. Cras vel auctor mauris.
            Fusce volutpat massa et erat viverra, dignissim rhoncus mauris
            lobortis. Integer molestie, augue et molestie aliquet, nunc mi
            tristique sem, sollicitudin aliquam neque risus a lorem. Proin vitae
            ipsum pellentesque, suscipit augue eu, dignissim nulla.
          </p>
        </div>
        <div className="blocresumecv">
          <h2
            id="3cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Expérience Professionnelle
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Quisque convallis, leo in elementum tincidunt, mi justo vestibulum
            est, ut sagittis turpis purus rhoncus neque. Fusce neque nisi,
            sagittis id nunc sed, posuere pellentesque nulla. Phasellus sodales,
            eros imperdiet consectetur egestas, nibh dui viverra velit, a
            sagittis risus leo nec lorem. Integer id libero condimentum,
            accumsan mi sit amet, tempus enim. Donec eu risus ut sapien
            fermentum egestas non a dui. Integer massa augue, porttitor quis
            nulla ut, tempor facilisis magna. Cras pretium urna ut erat pretium,
            ac pulvinar leo scelerisque. Etiam fermentum suscipit sollicitudin.
            justo risus pulvinar justo, ut commodo turpis justo in ex. Mauris
            nec augue a libero hendrerit sagittis. Donec magna metus, tincidunt
            a ultrices non, placerat a nulla. Ut varius sapien est, et mattis
            odio imperdiet ac. Duis dictum risus ut commodo suscipit. Nullam
            luctus lacus felis, rhoncus lobortis elit tristique semper.
            Suspendisse potenti. Vestibulum eu feugiat libero. In placerat
            euismod nisi ac pulvinar.
          </p>
        </div>
        <div className="blocresumecv">
          <h2
            id="4cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Projets Personnels
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Ut pulvinar ante sit amet libero venenatis tempus in in turpis.
            Maecenas vel dapibus velit. In a lorem sit amet ipsum scelerisque
            lacinia. Vestibulum tincidunt vehicula odio, eu molestie leo
            facilisis sed. Phasellus vitae risus auctor, laoreet lorem sed,
            dapibus augue. Duis efficitur, purus ut viverra suscipit, dolor
            dolor blandit ex, sed mollis urna velit sit amet risus. Curabitur
            eget enim sed nisi ornare faucibus. Morbi placerat viverra urna,
            hendrerit ornare augue lobortis vel. Mauris in ex sed urna tempor
            tristique vitae et magna. justo risus pulvinar justo, ut commodo
            turpis justo in ex. Mauris nec augue a libero hendrerit sagittis.
            Donec magna metus, tincidunt a ultrices non, placerat a nulla. Ut
            varius sapien est, et mattis odio imperdiet ac. Duis dictum risus ut
            commodo suscipit. Nullam luctus lacus felis, rhoncus lobortis elit
            tristique semper. Suspendisse potenti. Vestibulum eu feugiat libero.
            In placerat euismod nisi ac pulvinar.
          </p>
        </div>
        <div className="blocresumecv">
          <h2
            id="5cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Formations
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            fringilla erat sit amet nibh aliquam interdum. Nam vitae enim
            sodales, hendrerit erat a, laoreet nulla. Etiam ultricies, leo sed
            mattis viverra, lacus erat molestie augue, ut posuere ex velit eget
            ligula. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Ut sollicitudin tristique bibendum. Aenean vel sagittis
            ipsum. Vestibulum vel ante id lectus bibendum elementum et sed nisi.
            Duis sed facilisis elit. Sed aliquam enim tellus, semper hendrerit
            erat lacinia vel. Phasellus molestie, justo non vulputate porttitor,
            tortor lorem semper turpis, vel bibendum nibh metus a quam.
            Vestibulum at nibh iaculis, porta diam placerat, fringilla mi. Cras
            vel auctor mauris. Fusce volutpat massa et erat viverra, dignissim
            rhoncus mauris lobortis. Integer molestie, augue et molestie
            aliquet, nunc mi tristique sem, sollicitudin aliquam neque risus a
            lorem. Proin vitae ipsum pellentesque, suscipit augue eu, dignissim
            nulla.
          </p>
        </div>
        <div className="blocresumecv">
          <h2
            id="6cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Certifications
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Nam bibendum, sem a viverra porttitor, sapien ex porttitor nisi,
            vitae fringilla mi urna non est. Pellentesque suscipit egestas nunc,
            in condimentum ipsum hendrerit sed. Duis pellentesque sem non risus
            luctus convallis. Nunc tempor tellus ac varius laoreet. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Aliquam sit amet molestie odio. Donec iaculis
            fringilla mi nec pharetra. Donec at augue metus. Nulla nibh tellus,
            vehicula consequat vestibulum eget, vestibulum consectetur diam.
            Aenean viverra tincidunt lorem, ac gravida justo lacinia a. Fusce
            mattis lorem odio, in placerat mi elementum ut.
          </p>
        </div>
        <div className="blocresumecv">
          <h2
            id="7cv"
            className={`titlecv ${Interfont.className}`}
            style={{
              color: theme.color2,
            }}
          >
            Langues
          </h2>
          <p
            className={`textecv ${Interfont.className}`}
            style={{
              color: theme.color,
            }}
          >
            Quisque convallis, leo in elementum tincidunt, mi justo vestibulum
            est, ut sagittis turpis purus rhoncus neque. Fusce neque nisi,
            sagittis id nunc sed, posuere pellentesque nulla. Phasellus sodales,
            eros imperdiet consectetur egestas, nibh dui viverra velit, a
            sagittis risus leo nec lorem. Integer id libero condimentum,
            accumsan mi sit amet, tempus enim.
          </p>
        </div>
      </div>
    </main>
  );
};

export default CV;
