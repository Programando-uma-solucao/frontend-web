import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

interface ModalTermsUseProps {
  onClose: () => void;
  accept: () => void;
  isOpen: boolean;
}

const ModalTermsUse = ({ isOpen, onClose, accept }: ModalTermsUseProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Termos e condições gerais de uso do aplicativo Una Facilita
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>
              Termos e condições gerais de uso do aplicativo Una Facilita Os
              serviços do Una Facilita são fornecidos pela pessoa jurídica
              Centro Universitário Una e com nome fantasia ___, inscrito no
              CNPJ/CPF sob o nº ___, titular da propriedade intelectual sobre
              software, website, aplicativos, conteúdos e demais ativos
              relacionados à plataforma ______.
              <br />
              1. Do objeto
              <br />
              A plataforma visa licenciar o uso de seu software, website,
              aplicativos e demais ativos de propriedade intelectual, fornecendo
              ferramentas para auxiliar e dinamizar o dia a dia dos seus
              usuários.
              <br />
              A plataforma caracteriza-se pela prestação do seguinte serviço,
              prestação de informações jurídicas para pessoas hipossuficientes.
              <br />
              2. Da aceitação
              <br />
              O presente Termo estabelece obrigações contratadas de livre e
              espontânea vontade, por tempo indeterminado, entre a plataforma e
              as pessoas físicas ou jurídicas, usuárias do OU site OU
              aplicativo.
              <br />
              Ao utilizar a plataforma o usuário aceita integralmente as
              presentes normas e compromete-se a observá-las, sob o risco de
              aplicação das penalidades cabíveis.
              <br />
              A aceitação do presente instrumento é imprescindível para o acesso
              e para a utilização de quaisquer serviços fornecidos pela empresa.
              Caso não concorde com as disposições deste instrumento, o usuário
              não deve utilizá-los.
              <br />
              3. Do acesso dos usuários
              <br />
              Serão utilizadas todas as soluções técnicas à disposição do
              responsável pela plataforma para permitir o acesso ao serviço 24
              (vinte e quatro) horas por dia, 7 (sete) dias por semana. No
              entanto, a navegação na plataforma ou em alguma de suas páginas
              poderá ser interrompida, limitada ou suspensa para atualizações,
              modificações ou qualquer ação necessária ao seu bom funcionamento.
              <br />
              4. Do cadastro
              <br />
              O acesso às funcionalidades da plataforma exigirá a realização de
              um cadastro prévio.
              <br />
              Ao se cadastrar o usuário deverá informar dados completos,
              recentes e válidos, sendo de sua exclusiva responsabilidade manter
              referidos dados atualizados, bem como o usuário se compromete com
              a veracidade dos dados fornecidos.
              <br />
              O usuário deverá declarar que só usará o serviço se for pessoa
              hipossuficiente, sob pena de imediata rescisão unilateral por
              parte da razão social ____ e o bloqueio de todos os serviços
              prestados ao usuário. O usuário se compromete a não informar seus
              dados cadastrais e/ou de acesso à plataforma a terceiros,
              responsabilizando-se integralmente pelo uso que deles seja feito.
              <br />
              Menores de 18 anos e aqueles que não possuírem plena capacidade
              civil deverão obter previamente o consentimento expresso de seus
              responsáveis legais para utilização da plataforma e dos serviços
              ou produtos, sendo de responsabilidade exclusiva dos mesmos o
              eventual acesso por menores de idade e por aqueles que não possuem
              plena capacidade civil sem a prévia autorização.
              <br />
              Mediante a realização do cadastro o usuário declara e garante
              expressamente ser plenamente capaz, podendo exercer e usufruir
              livremente dos serviços e produtos.
              <br />
              O usuário deverá fornecer um endereço de e-mail válido, através do
              qual o site realizará todas comunicações necessárias.
              <br />
              Após a confirmação do cadastro, o usuário possuirá um login e uma
              senha pessoal, a qual assegura ao usuário o acesso individual à
              mesma. Desta forma, compete ao usuário exclusivamente a manutenção
              de referida senha de maneira confidencial e segura, evitando o
              acesso indevido às informações pessoais.
              <br />
              Toda e qualquer atividade realizada com o uso da senha será de
              responsabilidade do usuário, que deverá informar prontamente a
              plataforma em caso de uso indevido da respectiva senha.
              <br />
              Não será permitido ceder, vender, alugar ou transferir, de
              qualquer forma, a conta, que é pessoal e intransferível.
              <br />
              Caberá ao usuário assegurar que o seu equipamento seja compatível
              com as características técnicas que viabilize a utilização da
              plataforma e dos serviços ou produtos.
              <br />
              O usuário poderá, a qualquer tempo, requerer o cancelamento de seu
              cadastro junto ao aplicativo Una Facilita.
              <br />
              O usuário, ao aceitar os Termos e Política de Privacidade,
              autoriza expressamente a plataforma a coletar, usar, armazenar,
              tratar, ceder ou utilizar as informações derivadas do uso dos
              serviços, do site e quaisquer plataformas, incluindo todas as
              informações preenchidas pelo usuário no momento em que realizar ou
              atualizar seu cadastro, além de outras expressamente descritas na
              Política de Privacidade que deverá ser autorizada pelo usuário.
              <br />
              5. Do suportes
              <br />
              Em caso de qualquer dúvida, sugestão ou problema com a utilização
              da plataforma, o usuário poderá entrar em contato com o suporte,
              através do e-mail ___ OU telefone ____.
              <br />
              Estes serviços de atendimento ao usuário estarão disponíveis nos
              seguintes dias e horários: ____.
              <br />
              6. Das responsabilidades
              <br />
              É de responsabilidade do usuário:
              <br />
              a) defeitos ou vícios técnicos originados no próprio sistema do
              usuário;
              <br />
              b) a correta utilização da plataforma, dos serviços ou produtos
              oferecidos, prezando pela boa convivência, pelo respeito e
              cordialidade entre os usuários;
              <br />
              c) pelo cumprimento e respeito ao conjunto de regras disposto
              nesse Termo de Condições Geral de Uso, na respectiva Política de
              Privacidade e na legislação nacional e internacional;
              <br />
              d) pela proteção aos dados de acesso à sua conta/perfil (login e
              senha).
              <br />
              É de responsabilidade da plataforma Una Facilita:
              <br />
              a) as informações que foram por ele divulgadas, sendo que os
              comentários ou informações divulgadas por usuários são de inteira
              responsabilidade dos próprios usuários;
              <br />
              b) os conteúdos ou atividades ilícitas praticadas através da sua
              plataforma.
              <br />
              A plataforma não se responsabiliza por links externos contidos em
              seu sistema que possam redirecionar o usuário à ambiente externo a
              sua rede.
              <br />
              Não poderão ser incluídos links externos ou páginas que sirvam
              para fins comerciais ou publicitários ou quaisquer informações
              ilícitas, violentas, polêmicas, pornográficas, xenofóbicas,
              discriminatórias ou ofensivas.
              <br />
              7. Dos direitos autorais
              <br />
              O presente Termo de Uso concede aos usuários uma licença não
              exclusiva, não transferível e não sublicenciável, para acessar e
              fazer uso da plataforma e dos serviços e produtos por ela
              disponibilizados.
              <br />
              A estrutura do site ou aplicativo, as marcas, logotipos, nomes
              comerciais, layouts, gráficos e design de interface, imagens,
              ilustrações, fotografias, apresentações, vídeos, conteúdos
              escritos e de som e áudio, programas de computador, banco de
              dados, arquivos de transmissão e quaisquer outras informações e
              direitos de propriedade intelectual da razão social ___,
              observados os termos da Lei da Propriedade Industrial (Lei nº
              9.279/96), Lei de Direitos Autorais (Lei nº 9.610/98) e Lei do
              Software (Lei nº 9.609/98), estão devidamente reservados.
              <br />
              Este Termos de Uso não cede ou transfere ao usuário qualquer
              direito, de modo que o acesso não gera qualquer direito de
              propriedade intelectual ao usuário, exceto pela licença limitada
              ora concedida.
              <br />
              O uso da plataforma pelo usuário é pessoal, individual e
              intransferível, sendo vedado qualquer uso não autorizado,
              comercial ou não-comercial. Tais usos consistirão em violação dos
              direitos de propriedade intelectual da razão social ___, puníveis
              nos termos da legislação aplicável.
              <br />
              8. Das sanções
              <br />
              Sem prejuízo das demais medidas legais cabíveis, a razão social __
              poderá, a qualquer momento, advertir, suspender ou cancelar a
              conta do usuário:
              <br />
              a) que violar qualquer dispositivo do presente Termo;
              <br />
              b) que descumprir os seus deveres de usuário;
              <br />
              c) que tiver qualquer comportamento fraudulento, doloso ou que
              ofenda a terceiros.
              <br />
              9. Da rescisão
              <br />
              A não observância das obrigações pactuadas neste Termo de Uso ou
              da legislação aplicável poderá, sem prévio aviso, ensejar a
              imediata rescisão unilateral por parte da razão social ____ e o
              bloqueio de todos os serviços prestados ao usuário.
              <br />
              10. Das alterações
              <br />
              Os itens descritos no presente instrumento poderão sofrer
              alterações, unilateralmente e a qualquer tempo, por parte de ___,
              para adequar ou modificar os serviços, bem como para atender novas
              exigências legais. As alterações serão veiculadas pelo aplicativo
              Una Facilita e o usuário poderá optar por aceitar o novo conteúdo
              ou por cancelar o uso dos serviços, caso seja assinante de algum
              serviço.
              <br />
              11. Da política de privacidade
              <br />
              Além do presente Termo, o usuário deverá consentir com as
              disposições contidas na respectiva Política de Privacidade a ser
              apresentada a todos os interessados dentro da interface da
              plataforma.
              <br />
              12. Do foro
              <br />
              Para a solução de controvérsias decorrentes do presente
              instrumento será aplicado integralmente o Direito brasileiro.
              <br />
              Os eventuais litígios deverão ser apresentados no foro da comarca
              em que se encontra a sede da empresa.
              <br />
              Política de Privacidade
              <br />
              A sua privacidade é importante para nós.
              <br />
              É política do Una Facilita respeitar a sua privacidade em relação
              a qualquer informação sua que possamos coletar no site Una
              Facilita, e outros sites que possuímos e operamos.
              <br />
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornece um serviço. Fazemos por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.
              <br />
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados. Não compartilhamos informações de
              identificação pessoal publicamente ou com terceiros, exceto quando
              exigido por lei.
              <br />
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade.
              <br />
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados. O uso continuado de nosso site será
              considerado como aceitação de nossas práticas em torno de
              privacidade e informações pessoais. Se você tiver alguma dúvida
              sobre como lidamos com dados do usuário e informações pessoais,
              entre em contacto conosco.
              <br />
              Compromisso do Usuário
              <br />
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que o Una Facilita oferece no site e com caráter
              enunciativo, mas não limitativo:
              <br />
              A) Não se envolver em atividades que sejam ilegais ou contrárias à
              boa fé a à ordem pública;
              <br />
              B) Não difundir propaganda ou conteúdo de natureza racista,
              xenofóbica, ou apostas online (ex.: Moosh), jogos de sorte e azar,
              qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou
              contra os direitos humanos;
              <br />
              C) Não causar danos aos sistemas físicos (hardwares) e lógicos
              (softwares) do Una Facilita, de seus fornecedores ou terceiros,
              para introduzir ou disseminar vírus informáticos ou quaisquer
              outros sistemas de hardware ou software que sejam capazes de
              causar danos anteriormente mencionados.
              <br />
              Mais informações
              <br />
              Esperemos que esteja esclarecido e, como mencionado anteriormente,
              se houver algo que você não tem certeza se precisa ou não,
              geralmente é mais seguro deixar os cookies ativados, caso interaja
              com um dos recursos que você usa em nosso site. Esta política é
              efetiva a partir de maio/2021.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant="ghost" onClick={accept}>
              Aceitar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTermsUse;
