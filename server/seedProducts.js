const mongoose = require('mongoose');
const dns = require('node:dns');
require('dotenv').config({ path: __dirname + '/.env' });
const Product = require('./models/Product');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const sampleProducts = [
  // --- NHÓM 1: EAU DE PARFUM (EDP) ---
  {
    name: 'Lost Cherry - Tom Ford',
    category: 'Eau de Parfum',
    price: '4.225.000₫',
    originalPrice: '6.500.000₫',
    isSale: true,
    discountPercent: 35,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80',
    description: 'Một hành trình mùi hương lôi cuốn và bí ẩn. Hương anh đào chín mọng quyện cùng rượu hạnh nhân và hoa hồng Thổ Nhĩ Kỳ, tạo nên dấu ấn gợi cảm khó quên.'
  },
  {
    name: 'Bleu de Chanel',
    category: 'Eau de Parfum',
    price: '3.950.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Hương gỗ thơm quyến rũ kết hợp cam bergamot tươi mát và gỗ tuyết tùng nam tính.'
  },
  {
    name: 'Sauvage - Dior',
    category: 'Eau de Parfum',
    price: '3.800.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    description: 'Bản hòa ca của hạt tiêu tứ xuyên, cam bergamot Calabria và long diên hương ấm áp.'
  },
  {
    name: 'Black Orchid - Tom Ford',
    category: 'Eau de Parfum',
    price: '4.650.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Huyền bí và nồng nàn với hoa phong lan đen, nấm truffle và vani Pháp thượng hạng.'
  },
  {
    name: 'Another 13 - Le Labo',
    category: 'Eau de Parfum',
    price: '5.200.000₫',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    description: 'Nốt hương ambroxan độc bản hòa quyện cùng xạ hương và quả lê mọng nước.'
  },
  {
    name: 'Oud Wood - Tom Ford',
    category: 'Eau de Parfum',
    price: '6.200.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Hương gỗ trầm quý hiếm kết hợp cùng bạch đậu khấu và đậu tonka huyền bí.'
  },
  {
    name: 'Thé Noir 29 - Le Labo',
    category: 'Eau de Parfum',
    price: '5.100.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'Sự sâu lắng của lá trà đen kết hợp quả sung chín, tuyết tùng và cỏ vetiver.'
  },
  {
    name: 'Aventus - Creed',
    category: 'Eau de Parfum',
    price: '7.800.000₫',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    description: 'Huyền thoại dứa khói, táo xanh, gỗ sồi và xạ hương đầy bản lĩnh vương giả.'
  },
  {
    name: 'Silver Mountain Water - Creed',
    category: 'Eau de Parfum',
    price: '6.900.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Lấy cảm hứng từ dòng suối băng trên dãy Alps mát lạnh với trà xanh và nho đen.'
  },
  {
    name: 'Tobacco Vanille - Tom Ford',
    category: 'Eau de Parfum',
    price: '6.400.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
    description: 'Ấm áp hoài cổ với lá thuốc lá thơm, vani béo ngậy và gia vị phương Đông.'
  },
  {
    name: 'Coco Mademoiselle - Chanel',
    category: 'Eau de Parfum',
    price: '4.200.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    description: 'Vẻ đẹp thanh lịch vượt thời gian của hoa hồng Thổ Nhĩ Kỳ, hoắc hương và cam tươi.'
  },
  {
    name: 'Libre Intense - YSL',
    category: 'Eau de Parfum',
    price: '3.650.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    description: 'Tuyên ngôn tự do bùng nổ của hoa oải hương Pháp kết hợp hoa cam Morocco ngọt ngào.'
  },
  {
    name: 'Replica Jazz Club - Maison Margiela',
    category: 'Eau de Parfum',
    price: '3.450.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Không gian quán bar jazz cổ điển ngập tràn hương rượu rum, xì gà và vani.'
  },
  {
    name: 'Replica By the Fireplace - Maison Margiela',
    category: 'Eau de Parfum',
    price: '3.450.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'Cảm giác ấm cúng bên lò sưởi mùa đông với hạt dẻ nướng và hương gỗ ấm.'
  },
  {
    name: 'Rose 31 - Le Labo',
    category: 'Eau de Parfum',
    price: '5.100.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Đóa hồng Grasse bí ẩn kết hợp cùng thì là Ai Cập và gỗ tuyết tùng gai góc.'
  },
  {
    name: 'Santal Blanc - Van Cleef & Arpels',
    category: 'Eau de Parfum',
    price: '4.100.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Gỗ đàn hương êm dịu hòa cùng sữa quả sung và xạ hương trắng tinh khiết.'
  },

  // --- NHÓM 2: EXTRAIT DE PARFUM (NỒNG ĐỘ CAO CẤP NHẤT) ---
  {
    name: 'Baccarat Rouge 540 Extrait - MFK',
    category: 'Extrait de Parfum',
    price: '9.800.000₫',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Tuyệt tác nốt hương hạnh nhân đắng, nhụy hoa nghệ tây và long diên hương sang trọng.'
  },
  {
    name: 'Grand Soir - Maison Francis Kurkdjian',
    category: 'Extrait de Parfum',
    price: '6.800.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    description: 'Đêm Paris rực rỡ với hổ phách nồng ấm, đậu tonka và vani ngọt dịu xa hoa.'
  },
  {
    name: 'Ani - Nishane',
    category: 'Extrait de Parfum',
    price: '5.600.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    description: 'Nốt hương vani phức hợp đỉnh cao kết hợp cam bergamot, gừng và bạch đậu khấu.'
  },
  {
    name: 'Hacivat - Nishane',
    category: 'Extrait de Parfum',
    price: '5.800.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Hương dứa chín, bưởi tây và rêu sồi sắc nét với độ bám tỏa cực kỳ ấn tượng.'
  },
  {
    name: 'Black Afgano - Nasomatto',
    category: 'Extrait de Parfum',
    price: '4.800.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    description: 'Bí ẩn, ma mị với hương khói cần sa, cà phê đậm đặc và trầm hương quý tộc.'
  },
  {
    name: 'Baraonda - Nasomatto',
    category: 'Extrait de Parfum',
    price: '4.800.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Ly rượu whisky hảo hạng trong thùng gỗ sồi, nốt hương hoa hồng và quả mọng say đắm.'
  },
  {
    name: 'Interlude Man 53 - Amouage',
    category: 'Extrait de Parfum',
    price: '11.500.000₫',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'Được ủ trứ danh suốt 6 tháng với nồng độ tinh dầu 53% cùng nhựa cây và da thuộc.'
  },
  {
    name: 'Reflection 45 - Amouage',
    category: 'Extrait de Parfum',
    price: '11.800.000₫',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Kiệt tác hoa cam, diên vĩ và gỗ tuyết tùng đạt đến đỉnh cao tinh tế của phái mạnh.'
  },
  {
    name: 'Guidance 46 - Amouage',
    category: 'Extrait de Parfum',
    price: '12.000.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Hương quả lê tươi, hạt phỉ, hoa mộc tê và long diên hương hoàng gia quyến rũ.'
  },
  {
    name: 'Oud Maracujá - Maison Crivelli',
    category: 'Extrait de Parfum',
    price: '6.900.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    description: 'Sự tương phản mãnh liệt giữa quả chanh dây nhiệt đới và gỗ trầm hương bốc khói.'
  },
  {
    name: 'Hibiscus Mahajád - Maison Crivelli',
    category: 'Extrait de Parfum',
    price: '6.900.000₫',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
    description: 'Trà hoa dâm bụt đỏ rực rỡ hòa cùng vani thơm béo và da thuộc quý phái.'
  },
  {
    name: 'Pegasus Exclusif - Parfums de Marly',
    category: 'Extrait de Parfum',
    price: '7.500.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    description: 'Hạnh nhân đắng kết hợp gỗ trầm và tiêu hồng tạo nên khí chất vương tộc.'
  },

  // --- NHÓM 3: EAU DE TOILETTE (EDT) ---
  {
    name: 'Bleu de Chanel EDT',
    category: 'Eau de Toilette',
    price: '3.200.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Bản EDT sảng khoái với bưởi tây, bạc hà the mát và gỗ bách hương thanh lịch.'
  },
  {
    name: 'Sauvage EDT - Dior',
    category: 'Eau de Toilette',
    price: '3.100.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    description: 'Khởi nguồn của huyền thoại Sauvage với tiêu Tứ Xuyên và cam bergamot bùng nổ.'
  },
  {
    name: 'Acqua Di Gio - Giorgio Armani',
    category: 'Eau de Toilette',
    price: '2.650.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Hương biển Địa Trung Hải tươi mát kết hợp hương thảo và hoa nhài thanh khiết.'
  },
  {
    name: 'Tam Dao - Diptyque',
    category: 'Eau de Toilette',
    price: '3.900.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Tái hiện khu rừng Tam Đảo nguyên sơ với gỗ đàn hương Goa, bách xù và xạ hương.'
  },
  {
    name: 'Philosykos - Diptyque',
    category: 'Eau de Toilette',
    price: '3.900.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'Vị ngọt thanh dịu của quả sung, lá sung xanh ngát và hương gỗ tuyết tùng trắng.'
  },
  {
    name: 'Do Son - Diptyque',
    category: 'Eau de Toilette',
    price: '3.900.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Ký ức vịnh Đồ Sơn ngập tràn hương hoa huệ trắng đằm thắm trong gió biển hè.'
  },
  {
    name: 'L’Ombre Dans L’Eau - Diptyque',
    category: 'Eau de Toilette',
    price: '3.900.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    description: 'Khu vườn ven bờ nước với lá lý chua đen xanh non và những đóa hồng Damask.'
  },
  {
    name: 'Allure Homme Sport - Chanel',
    category: 'Eau de Toilette',
    price: '3.400.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    description: 'Phong cách thể thao năng động với quýt hồng, hạt tiêu và đậu tonka gợi cảm.'
  },
  {
    name: 'Replica Lazy Sunday Morning - Margiela',
    category: 'Eau de Toilette',
    price: '3.350.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Cảm giác cuộn mình trong tấm ga trải giường cotton trắng tinh khiết ngày Chủ nhật.'
  },
  {
    name: 'Replica Sailing Day - Margiela',
    category: 'Eau de Toilette',
    price: '3.350.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Làn gió đại dương xanh biếc với nốt hương biển mặn mà, hoa diên vĩ và tảo đỏ.'
  },
  {
    name: 'Un Jardin Sur Le Nil - Hermès',
    category: 'Eau de Toilette',
    price: '3.200.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'Khu vườn bên sông Nile với xoài xanh, hoa sen và cây lau sậy thanh tao.'
  },
  {
    name: 'Terre d’Hermès EDT',
    category: 'Eau de Toilette',
    price: '3.100.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Sự gắn kết diệu kỳ giữa đất và trời với cam đắng, đá lửa và cỏ vetiver.'
  },
  {
    name: 'Light Blue Eau Intense - D&G',
    category: 'Eau de Toilette',
    price: '2.400.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Hương chanh vàng Capri rạng rỡ và táo xanh giòn tan mang hương vị mùa hè bất tận.'
  },

  // --- NHÓM 4: EAU DE COLOGNE & COLOGNE (EDC) ---
  {
    name: 'Wood Sage & Sea Salt - Jo Malone',
    category: 'Eau de Cologne',
    price: '3.800.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    description: 'Gió biển mặn thổi qua vách đá và nốt xô thơm tự nhiên mang lại cảm giác an yên.'
  },
  {
    name: 'English Pear & Freesia - Jo Malone',
    category: 'Eau de Cologne',
    price: '3.800.000₫',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Quả lê mùa thu mọng nước được bao bọc bởi những bông hoa lan Nam Phi trắng muốt.'
  },
  {
    name: 'Peony & Blush Suede - Jo Malone',
    category: 'Eau de Cologne',
    price: '3.800.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80',
    description: 'Hoa mẫu đơn nở rộ dịu dàng hòa quyện cùng táo đỏ ngọt ngào và da lộn êm ái.'
  },
  {
    name: 'Lime Basil & Mandarin - Jo Malone',
    category: 'Eau de Cologne',
    price: '3.800.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    description: 'Nốt húng quế cay nồng độc đáo phối hợp cùng chanh tươi và cam quýt căng mọng.'
  },
  {
    name: 'Colonia Futura - Acqua di Parma',
    category: 'Eau de Cologne',
    price: '3.600.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80',
    description: 'Nốt hương cam chanh Ý truyền thống kết hợp oải hương và cây xô thơm thanh sạch.'
  },
  {
    name: 'Neroli Portofino - Tom Ford',
    category: 'Eau de Cologne',
    price: '5.900.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'Hương hoa cam Neroli nước Ý tái hiện vẻ đẹp biển trời vùng bờ biển Portofino.'
  },
  {
    name: 'Eau de Cologne Imperiale - Guerlain',
    category: 'Eau de Cologne',
    price: '2.950.000₫',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'Chai nước hoa hoàng gia lừng danh từ năm 1853 với tinh dầu cam, chanh và cỏ roi ngựa.'
  },
  {
    name: 'Mandarino di Amalfi - Tom Ford',
    category: 'Eau de Cologne',
    price: '5.900.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
    description: 'Cơn gió mát lành bên vách đá Amalfi với cam quýt, bạc hà và hoa dã quỳ dại.'
  },
  {
    name: 'Blackberry & Bay - Jo Malone',
    category: 'Eau de Cologne',
    price: '3.800.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    description: 'Vị chua thanh mát của mâm xôi dại hòa lẫn lá nguyệt quế và gỗ tuyết tùng rừng già.'
  },
  {
    name: 'Wild Bluebell - Jo Malone',
    category: 'Eau de Cologne',
    price: '3.800.000₫',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    description: 'Hoa chuông xanh rừng mờ sương, hoa linh lan và quả hồng thanh tao ngọt dịu.'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB!');

    // Xóa sản phẩm cũ hoặc bổ sung
    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log(`Inserting ${sampleProducts.length} new luxury products...`);
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${inserted.length} products to database!`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
